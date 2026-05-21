"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { createStaggerContainer, fadeInUp } from "@/utils/animations";
import { cn } from "@/lib/utils";
import LazyVideo from "@/components/ui/LazyVideo";

/**
 * A single media slot in the gallery.
 *
 * Pass a plain URL string and the type is inferred from the file
 * extension (`.mp4`, `.webm`, `.mov`, ... → video, everything else →
 * image). Pass an object when you need to override the type, set alt
 * text, or supply a video poster.
 */
export interface GalleryMedia {
  src: string;
  /** Overrides the extension-based detection. */
  type?: "image" | "video";
  /** Alt text for images / aria-label for videos. */
  alt?: string;
  /** Poster frame shown before a video loads. */
  poster?: string;
}

export type GalleryItem = string | GalleryMedia;

interface ProjectGalleryProps {
  /** How many media slots to render: 1, 2, or 3. */
  count: 1 | 2 | 3;
  /** Image / video sources, one per slot. */
  items: GalleryItem[];
  /** Extra classes for the outer (full-width) container. */
  className?: string;
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv|ogg)$/i;

function normalize(item: GalleryItem): GalleryMedia {
  const media = typeof item === "string" ? { src: item } : { ...item };
  if (!media.type) {
    const path = media.src.split(/[?#]/)[0];
    media.type = VIDEO_EXT.test(path) ? "video" : "image";
  }
  return media as GalleryMedia;
}

interface MediaTileProps {
  media: GalleryMedia;
  /** next/image `sizes` hint for responsive loading. */
  sizes: string;
  /** Aspect / sizing classes applied to the tile box. */
  className?: string;
}

function MediaTile({ media, sizes, className }: MediaTileProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/5",
        className,
      )}
    >
      {media.type === "video" ? (
        <LazyVideo
          src={media.src}
          poster={media.poster}
          alt={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
    </motion.div>
  );
}

const TWO_UP_SIZES = "(max-width: 768px) 100vw, 50vw";

/**
 * Full-width media block used to showcase project work on the
 * `/work/[project-name]` pages.
 *
 * Layouts mirror the case-study reference designs:
 *  - count 1 → one wide landscape tile
 *  - count 2 → two equal portrait tiles, side by side
 *  - count 3 → two stacked landscape tiles on the left, one tall
 *    tile on the right spanning their combined height
 *
 * @example
 * <ProjectGallery count={1} items={["/projects/harpie/cover.webp"]} />
 *
 * @example
 * <ProjectGallery
 *   count={3}
 *   items={[
 *     "/projects/harpie/board.webp",
 *     "/projects/harpie/chart.webp",
 *     { src: "/projects/harpie/hero.mp4", poster: "/projects/harpie/hero.webp" },
 *   ]}
 * />
 */
const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  count,
  items,
  className,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const media = items.slice(0, count).map(normalize);

  let layout: React.ReactNode = null;

  if (count === 1 && media[0]) {
    layout = (
      <MediaTile media={media[0]} sizes="100vw" className="aspect-[3/2]" />
    );
  } else if (count === 2) {
    layout = (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {media.map((m, i) => (
          <MediaTile
            key={i}
            media={m}
            sizes={TWO_UP_SIZES}
            className="aspect-[3/4]"
          />
        ))}
      </div>
    );
  } else if (count === 3) {
    // Implicit (content-sized) grid rows: tiles A and B define the
    // height of column 1; tile C spans both rows so it always equals
    // their combined height + the row gap. Stacks vertically on mobile.
    layout = (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {media[0] && (
          <MediaTile
            media={media[0]}
            sizes={TWO_UP_SIZES}
            className="aspect-[16/10] md:col-start-1 md:row-start-1"
          />
        )}
        {media[1] && (
          <MediaTile
            media={media[1]}
            sizes={TWO_UP_SIZES}
            className="aspect-[16/10] md:col-start-1 md:row-start-2"
          />
        )}
        {media[2] && (
          <MediaTile
            media={media[2]}
            sizes={TWO_UP_SIZES}
            className="aspect-[3/4] md:col-start-2 md:row-start-1 md:row-span-2 md:aspect-auto md:h-full"
          />
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("w-full", className)}
      variants={createStaggerContainer(0.12, 0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {layout}
    </motion.div>
  );
};

export default React.memo(ProjectGallery);
