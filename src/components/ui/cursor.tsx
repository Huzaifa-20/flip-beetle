'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

type CursorContextType = {
  x: import('motion/react').MotionValue<number>;
  y: import('motion/react').MotionValue<number>;
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const CursorContext = React.createContext<CursorContextType | undefined>(
  undefined,
);

const useCursor = (): CursorContextType => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

type CursorProviderProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

function CursorProvider({ ref, children, ...props }: CursorProviderProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Memoize context value — only changes when isActive changes (not on every mousemove)
  const contextValue = React.useMemo(
    () => ({ x, y, isActive, containerRef, cursorRef }),
    [x, y, isActive],
  );

  React.useEffect(() => {
    if (!containerRef.current) return;

    const parent = containerRef.current.parentElement;
    if (!parent) return;

    // Check position once, avoid getComputedStyle reflow by reading style directly
    if (!parent.style.position || parent.style.position === 'static') {
      parent.style.position = 'relative';
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      // Write directly to motion values — zero React re-renders
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
      setIsActive(true);
    };
    const handleMouseLeave = () => setIsActive(false);

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <CursorContext.Provider value={contextValue}>
      <div ref={containerRef} data-slot="cursor-provider" {...props}>
        {children}
      </div>
    </CursorContext.Provider>
  );
}

type CursorProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};

function Cursor({ ref, children, className, style, ...props }: CursorProps) {
  const { x, y, isActive, containerRef, cursorRef } = useCursor();
  React.useImperativeHandle(ref, () => cursorRef.current as HTMLDivElement);

  // Only toggle cursor style when isActive changes, not on every mousemove
  React.useEffect(() => {
    const parentElement = containerRef.current?.parentElement;
    if (!parentElement) return;

    parentElement.style.cursor = isActive ? 'none' : 'default';

    return () => {
      parentElement.style.cursor = 'default';
    };
  }, [containerRef, isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorRef}
          data-slot="cursor"
          className={cn(
            'transform-[translate(-50%,-50%)] pointer-events-none z-[9999] absolute',
            className,
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type Align =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

type CursorFollowProps = HTMLMotionProps<'div'> & {
  sideOffset?: number;
  align?: Align;
  transition?: SpringOptions;
  children: React.ReactNode;
};

function CursorFollow({
  ref,
  sideOffset = 15,
  align = 'bottom-right',
  children,
  className,
  style,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  ...props
}: CursorFollowProps) {
  const { x: cursorX, y: cursorY, isActive, cursorRef } = useCursor();
  const cursorFollowRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => cursorFollowRef.current as HTMLDivElement,
  );

  const followX = useMotionValue(0);
  const followY = useMotionValue(0);

  const springX = useSpring(followX, transition);
  const springY = useSpring(followY, transition);

  // Subscribe to motion value changes directly — no React re-renders
  React.useEffect(() => {
    const update = () => {
      const rect = cursorFollowRef.current?.getBoundingClientRect();
      const width = rect?.width ?? 0;
      const height = rect?.height ?? 0;

      const cursorRect = cursorRef.current?.getBoundingClientRect();
      const cursorWidth = cursorRect?.width ?? 20;
      const cursorHeight = cursorRect?.height ?? 20;

      let offsetX = 0;
      let offsetY = 0;

      switch (align) {
        case 'center':
          offsetX = width / 2; offsetY = height / 2; break;
        case 'top':
          offsetX = width / 2; offsetY = height + sideOffset; break;
        case 'top-left':
          offsetX = width + sideOffset; offsetY = height + sideOffset; break;
        case 'top-right':
          offsetX = -sideOffset; offsetY = height + sideOffset; break;
        case 'bottom':
          offsetX = width / 2; offsetY = -sideOffset; break;
        case 'bottom-left':
          offsetX = width + sideOffset; offsetY = -sideOffset; break;
        case 'bottom-right':
          offsetX = -sideOffset; offsetY = -sideOffset; break;
        case 'left':
          offsetX = width + sideOffset; offsetY = height / 2; break;
        case 'right':
          offsetX = -sideOffset; offsetY = height / 2; break;
      }

      followX.set(cursorX.get() - offsetX + cursorWidth / 2);
      followY.set(cursorY.get() - offsetY + cursorHeight / 2);
    };

    // Subscribe to cursor motion values — fires outside React render cycle
    const unsubX = cursorX.on('change', update);
    const unsubY = cursorY.on('change', update);

    return () => {
      unsubX();
      unsubY();
    };
  }, [align, sideOffset, cursorX, cursorY, cursorRef, followX, followY]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorFollowRef}
          data-slot="cursor-follow"
          className={cn(
            'transform-[translate(-50%,-50%)] pointer-events-none z-[9998] absolute',
            className,
          )}
          style={{ top: springY, left: springX, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export {
  CursorProvider,
  Cursor,
  CursorFollow,
  useCursor,
  type CursorContextType,
  type CursorProviderProps,
  type CursorProps,
  type CursorFollowProps,
};
