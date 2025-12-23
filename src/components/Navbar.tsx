import Link from "next/link";

const NavLinks = [
  {
    label: "Service",
    href: "#",
  },
  {
    label: "Portfolio",
    href: "#",
  },
  {
    label: "Process",
    href: "#",
  },
];

const NavLink = (label: string, href: string) => (
  <Link
    key={label}
    href={href}
    className="text-xl font-bangers relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
  >
    {label}
  </Link>
);

const Navbar = () => {
  return (
    <div className="w-screen flex justify-center absolute">
      <div className="w-full max-w-[1136px] flex justify-between items-center py-4 px-8">
        <div className="w-fit flex justify-center items-center gap-8">
          {NavLinks.map((navLink) => NavLink(navLink.label, navLink.href))}
        </div>
        <button className="w-fit text-background text-xl font-bangers px-4 pt-1.5 pb-2 rounded-4xl cursor-pointer hover:bg-primary/90 transition-all duration-100 bg-primary">
          Let&apos;s Talk
        </button>
      </div>
    </div>
  );
};

export default Navbar;
