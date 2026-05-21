export const PROJECTS = [
  {
    title: "One Development",
    slug: "one-development",
    category: "Design",
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
    verticalImage: "/projects/drafitti/vertical_image.webp",
    horizontalImage: "/projects/drafitti/horizontal_image.webp",
    href: "/work/drafitti",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  // {
  //   title: "Camaradly",
  //   slug: "camaradly",
  //   category: "Design",
  //   verticalImage: "/projects/camaradly.webp",
  //   horizontalImage: "/projects/camaradly.webp",
  //   href: "/work/camaradly",
  //   colSpan: "md:col-span-5",
  //   aspectRatio: "aspect-[4/5]",
  //   offsetTop: true,
  // },
  {
    title: "Multipool Finance",
    slug: "multipool-finance",
    category: "Development",
    video:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,f_auto,q_auto/v1778083374/multipool_cjn5af.mp4",
    poster:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,so_0,f_auto,q_auto/v1778083374/multipool_cjn5af.jpg",
    href: "/work/multipool-finance",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Knot",
    slug: "knot",
    category: "Branding",
    verticalImage: "/projects/knot.jpg",
    horizontalImage: "/projects/knot.jpg",
    href: "/work/knot",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Tokinvest",
    slug: "tokinvest",
    category: "Development",
    verticalImage: "/projects/Tokinvest.webp",
    horizontalImage: "/projects/Tokinvest.webp",
    href: "/work/tokinvest",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
] as const;

export type Project = (typeof PROJECTS)[number];

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
