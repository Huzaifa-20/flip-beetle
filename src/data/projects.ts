/**
 * `featured: true` → project appears on the homepage AND on /work.
 * `featured: false` → project appears only on /work (the case study
 *  detail page is still generated either way).
 */
export const PROJECTS: readonly Project[] = [
  {
    title: "One Development",
    slug: "one-development",
    category: "Design",
    featured: true,
    verticalImage: "/projects/one/horizontal_image.webp",
    horizontalImage: "/projects/one/horizontal_image.webp",
    href: "/work/one-development",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Prep'd",
    slug: "prepd",
    category: "Design",
    featured: true,
    verticalImage: "/projects/prepd/vertical_image.webp",
    horizontalImage: "/projects/prepd/horizontal_image.webp",
    href: "/work/prepd",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  {
    title: "Drafitti",
    slug: "drafitti",
    category: "Branding",
    featured: true,
    verticalImage: "/projects/drafitti/vertical_image.webp",
    horizontalImage: "/projects/drafitti/horizontal_image.webp",
    href: "/work/drafitti",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  {
    title: "A Mother's",
    slug: "a-mothers",
    category: "Branding & Design",
    featured: true,
    horizontalImage: "/projects/a-mothers/horizontal_image.jpeg",
    href: "/work/a-mothers",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Multipool Finance: Website",
    slug: "multipool-finance-website",
    category: "Development",
    featured: true,
    video:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,f_auto,q_auto/v1778083374/multipool_cjn5af.mp4",
    poster:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,so_0,f_auto,q_auto/v1778083374/multipool_cjn5af.jpg",
    href: "/work/multipool-finance-website",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Camaradly",
    slug: "camaradly",
    category: "Design",
    featured: true,
    verticalImage: "/projects/camaradly/vertical_cover.webp",
    horizontalImage: "/projects/camaradly/horizontal_cover.webp",
    href: "/work/camaradly",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  // {
  //   title: "Knot",
  //   slug: "knot",
  //   category: "Branding",
  //   featured: true,
  //   horizontalImage: "/projects/knot/horizontal_image.png",
  //   href: "/work/knot",
  //   colSpan: "md:col-span-7",
  //   aspectRatio: "aspect-[16/10]",
  // },
  // {
  //   title: "Tokinvest",
  //   slug: "tokinvest",
  //   category: "Development",
  //   featured: true,
  //   verticalImage: "/projects/Tokinvest.webp",
  //   horizontalImage: "/projects/Tokinvest.webp",
  //   href: "/work/tokinvest",
  //   colSpan: "md:col-span-5",
  //   aspectRatio: "aspect-[4/5]",
  //   offsetTop: true,
  // },
];

export interface Project {
  title: string;
  slug: string;
  category: string;
  /** Hidden from the homepage when false; the /work listing and case
   *  study page still render either way. */
  featured: boolean;
  href: string;
  colSpan: string;
  aspectRatio: string;
  /** Listing-grid offset on desktop. */
  offsetTop?: boolean;
  /** Video-cover entries: set both `video` and (ideally) `poster`. */
  video?: string;
  poster?: string;
  /** Image-cover entries: at least one of these should be set.
   *  Listing tiles prefer `verticalImage` and fall back to `horizontalImage`. */
  horizontalImage?: string;
  verticalImage?: string;
}

export const PROJECT_CATEGORIES = [
  "BRANDING",
  "DESIGN",
  "DEVELOPMENT",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectFilter = "ALL" | ProjectCategory;

export function getProjectCategories(project: Project): ProjectCategory[] {
  const lower = project.category.toLowerCase();
  const result: ProjectCategory[] = [];
  if (lower.includes("branding")) result.push("BRANDING");
  if (lower.includes("design")) result.push("DESIGN");
  if (lower.includes("development")) result.push("DEVELOPMENT");
  return result;
}

export function getPrimaryProjectCategory(project: Project): ProjectCategory {
  return getProjectCategories(project)[0] ?? "DESIGN";
}

export function projectMatchesFilter(
  project: Project,
  filter: ProjectFilter,
): boolean {
  if (filter === "ALL") return true;
  return getProjectCategories(project).includes(filter);
}
