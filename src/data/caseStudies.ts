import type { GalleryItem } from "@/components/work/ProjectGallery";
import { PROJECTS, type Project } from "@/data/projects";

/**
 * Case studies powering the `/work/[project-name]` detail pages.
 *
 * Each study is metadata + an ordered list of content blocks so text,
 * media galleries, quotes and stats can be interleaved freely — the
 * same authoring model agencies like juice.agency use.
 *
 * Studies are derived from `PROJECTS` so the listing cards on `/work`
 * (and the home Projects section) link straight to a matching page —
 * add a project there and its case study appears automatically.
 *
 * NOTE: copy is placeholder/dummy and gallery imagery reuses the few
 * images already in /public/projects. Swap `cover`, the gallery
 * `items`, and the block copy as real content lands — the structure
 * stays the same.
 */

export interface CaseStudyStat {
  value: string;
  label: string;
}

export type CaseStudyBlock =
  | {
      type: "section";
      /** Small label above the heading, e.g. "The challenge". */
      eyebrow?: string;
      heading: string;
      /** One <p> per array entry. */
      body: string[];
    }
  | {
      type: "gallery";
      count: 1 | 2 | 3;
      items: GalleryItem[];
      caption?: string;
    }
  | {
      type: "quote";
      quote: string;
      attribution: string;
      role?: string;
    }
  | {
      type: "stats";
      heading?: string;
      items: CaseStudyStat[];
    };

export interface CaseStudy {
  slug: string;
  /** Hero headline. */
  title: string;
  /** Hero sub-headline / project tagline. */
  tagline: string;
  client: string;
  services: string[];
  year: string;
  /** Full-bleed hero media (image or video). */
  cover: GalleryItem;
  /**
   * Optional external project URL. When set, a "View Project" button
   * appears in the hero (below the tagline) linking out to it. The link
   * opens in a new tab. Omit the field to hide the button.
   */
  projectUrl?: string;
  blocks: CaseStudyBlock[];
}

/** Limited set of real local images, reused across gallery slots. */
const IMAGE_POOL = [
  "/projects/Studio_Crobe.webp",
  "/projects/camaradly.webp",
  "/projects/Tokinvest.webp",
  "/projects/knot.jpg",
  "/projects/prepd.webp",
] as const;

/** Pick `n` images from the pool, offset so each project differs. */
function pickImages(offset: number, n: number): string[] {
  return Array.from(
    { length: n },
    (_, i) => IMAGE_POOL[(offset + i) % IMAGE_POOL.length],
  );
}

const TEAM = [
  "Jonathan Crowe",
  "Rachael Demers",
  "Vlad Shutikov",
  "Pablo Cucchi",
  "Miranda Tejada",
];

/** Split a project's "Branding, Design, & Development" into a list. */
function parseServices(category: string): string[] {
  return category
    .split(/,|&/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function coverFor(project: Project): GalleryItem {
  if (project.video) {
    return { src: project.video, type: "video", poster: project.poster };
  }
  return project.horizontalImage ?? project.verticalImage ?? "";
}

/** Build a full, structured dummy case study from a listing project. */
function buildCaseStudy(project: Project, index: number): CaseStudy {
  const name = project.title;
  const services = parseServices(project.category);

  return {
    slug: project.slug,
    title: `${name}: ${["A New Visual System", "Rebuilt From The Ground Up", "Designed To Scale", "A Brand With Range", "Built To Convert", "A Sharper Story"][index % 6]}`,
    tagline: `${name} partnered with Flip Beetle on ${services
      .join(", ")
      .toLowerCase()} — turning an ambitious vision into a cohesive product and brand experience that performs across every touchpoint.`,
    client: name,
    services,
    year: `${2024 + (index % 2)}`,
    cover: coverFor(project),
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "The future is now",
        body: [
          `${name} came to us with a vision and the raw pieces of a brand. We started with a creative direction workshop — which led us to a visual system that feels modern and confident while still leaving room to connect with every kind of audience.`,
          "Great products live and die by trust. Every detail had to feel deliberate and credible, without losing the energy that makes the work exciting in the first place.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: pickImages(index, 1),
        caption: "A confident, full-bleed brand moment on a dark canvas.",
      },
      {
        type: "section",
        eyebrow: "The challenge",
        heading: "Make complexity feel effortless",
        body: [
          `${name} needed a system flexible enough to flex from a niche, expert audience to mainstream decision makers — across product UI, marketing site, social and pitch decks.`,
          "Most products in this space borrow the language of friction. We wanted the opposite: something that feels effortless, even delightful, so people stay engaged without ever thinking about the machinery underneath.",
        ],
      },
      {
        type: "gallery",
        count: 2,
        items: pickImages(index + 1, 2),
        caption: "Core palette and the type system, paired side by side.",
      },
      {
        type: "section",
        eyebrow: "The approach",
        heading: "One system, many voices",
        body: [
          "We built the identity around a single warm accent and a confident neutral base, then layered an expressive language on top for hero moments. The result can whisper or shout depending on the surface.",
          "A motion language, a component-driven web design, and a content framework rounded out the system so the team could keep shipping on-brand long after handoff.",
        ],
      },
      {
        type: "gallery",
        count: 3,
        items: pickImages(index + 2, 3),
        caption:
          "Social templates, the growth curve, and an editorial brand illustration.",
      },
      {
        type: "quote",
        quote: `Flip Beetle gave us a brand that finally matches the ambition of the product. It speaks to our core audience fluently but never loses the room when we're in front of everyone else.`,
        attribution: TEAM[index % TEAM.length],
        role: `Co-founder, ${name}`,
      },
      {
        type: "stats",
        heading: "The impact",
        items: [
          { value: "95%", label: "of users reach a successful outcome" },
          { value: "3.4×", label: "increase in marketing-site conversion" },
          { value: "6 wks", label: "from workshop to full system handoff" },
          { value: "1", label: "vision turned into a complete brand world" },
        ],
      },
      {
        type: "section",
        eyebrow: "The outcome",
        heading: "A brand built to scale with the mission",
        body: [
          `${name} now has a flexible, ownable identity that holds up everywhere from a product screen to a boardroom deck — and a system their team can extend without us in the room.`,
          "Complexity stopped looking like a barrier and started looking like the future.",
        ],
      },
    ],
  };
}

/**
 * Hand-authored content, keyed by project slug.
 *
 * Anything you put here is shallow-merged ON TOP of the generated
 * placeholder, so:
 *   - override just a field (e.g. only `tagline`) and the rest stays generated;
 *   - override `blocks` to replace the ENTIRE body with real content
 *     (the whole array is swapped — it is not deep-merged);
 *   - a slug with no entry here uses the generated placeholder as-is.
 *
 * This is where real copy/imagery goes as it lands — one self-contained
 * object per project. The `prepd` entry below is a worked example you
 * can copy for the others (or delete to fall back to the placeholder).
 */
const CASE_STUDY_OVERRIDES: Partial<Record<string, Partial<CaseStudy>>> = {
  prepd: {
    title: "Prep'd",
    tagline:
      "An intuitive marketplace delivering meals you've seen but never tried",
    client: "GoodyCo",
    services: ["Design"],
    year: "2021",
    projectUrl: "https://www.prepdby.com/",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "A cloud kitchen connecting influencer chefs with customers",
        body: [
          "Prep’d is the first Saudi marketplace that brings foodie influencers and their customers together through direct food delivery. The dishes offered on the app are curated by foodie influencers and meticulously prepared by Prep’d to deliver the highest quality meals to their followers. These are meals you’ve seen but never had the chance to try before! Follow your favorite foodie influencers, browse their dishes and products, place an order, and wait for it to be delivered.",
        ],
      },
      {
        type: "gallery",
        count: 2,
        items: [
          "/projects/prepd/typography_palette.webp",
          "/projects/prepd/images_icons.webp",
        ],
        caption: "A quick peek at the visual identity",
      },
      {
        type: "section",
        eyebrow: "User Flows",
        heading: "Consumers",
        body: [
          "This user flow was created to identify possible blockers that a customer might come across when using the application. Therefore, helping in improving the application's overall user experience.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/prepd/consumer_flow.webp"],
        caption: "Every screen a cosumer can possibly reach",
      },
      {
        type: "section",
        eyebrow: "User Flows",
        heading: "Chefs",
        body: [
          "This user flow was created to identify possible blockers that an influencer might come across when using the application. Therefore, helping in improving the application's overall user experience.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/prepd/chef_flow.webp"],
        caption: "Every screen a chef can possibly reach",
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/prepd/wireframes.webp"],
        caption: "Initial concept",
      },
      {
        type: "section",
        eyebrow: "Finale",
        heading: "Culmination of a lengthy design process",
        body: [
          "Once the user flows are finalised and the wireframes are made, a long list of UX interviews are setup. With careful iterations, each user experience is refined to perfection.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/prepd/onboarding_screens.webp"],
        caption: "Onboarding experience",
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/prepd/final_screens.webp"],
        caption: "A complete UX",
      },
    ],
  },
  "one-development": {
    title: "ONE Development",
    tagline: "ONE creates future-ready spaces inspired by you",
    client: "ONE",
    services: ["Design"],
    year: "2025",
    projectUrl: "https://oneuae.com/",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "ONE: Homegrown developer creating future-ready spaces",
        body: [
          "We’re disruptors at heart, driven by the belief that people and cities deserve better living experiences. With bold ideas, young energy, and a clear vision, we create smart, purposeful spaces where people and place connect as ONE. We move fast, build with intent, and partner with visionaries to redefine modern living across borders.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/one/visual_identity.webp"],
        caption: "A quick peek at the visual identity",
      },
      {
        type: "section",
        eyebrow: "Challenge",
        heading: "Story driven design",
        body: [
          "The existing landing page didn’t tell the story of One Development effectively. It lacked the visual appeal and narrative structure needed to engage users. As a homegrown boutique developer on a global journey, their unique values—sustainability, community, technology, and innovation—weren’t shining through. It was time to change that.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/one/old_website.webp"],
        caption: "The mess we had to clean up",
      },
      {
        type: "section",
        eyebrow: "Approach",
        heading: "Solving an identity crisis",
        body: [
          "Our mission was to align ONE Development's digital footprint with their true identity. Our three step approach: 'Understanding their vision', 'Redefining the structure', & 'Designing for impact' finally led us to a rough sketch of what greatness would look like.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/one/wireframes.webp"],
        caption: "Initial concept",
      },
      {
        type: "section",
        eyebrow: "Finale",
        heading: "Culmination of a lengthy design process",
        body: [
          "Once the wireframes were made, the only thing left to do was add a bit of razzle dazzle.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/one/final_screen.webp"],
        caption: "Sneek Peak",
      },
    ],
  },
  drafitti: {
    title: "Drafitti",
    tagline: "Show the world you care with what you wear!",
    client: "Drafitti",
    services: ["Branding"],
    year: "2023",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "Bringing out the artist in you",
        body: [
          "Drafitti is a clothing brand based on streetwear and art. The brand is build around three core values of Awareness, Identity, & Environment.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/drafitti/pillars.webp"],
        caption: "What we are all about",
      },
      {
        type: "gallery",
        count: 2,
        items: [
          "/projects/drafitti/typography.webp",
          "/projects/drafitti/palette.webp",
        ],
        caption: "Quick peak at the visual identity",
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/drafitti/logo.webp"],
        caption: "Logo design",
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/drafitti/frames.webp"],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/drafitti/vibe.webp"],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/drafitti/designs.webp"],
        caption: "Concept",
      },
    ],
  },
  "a-mothers": {
    title: "A Mother's",
    tagline: "A verified marketplace for parents to buy and sell excess milk!",
    client: "A Mother's LLC",
    services: ["Branding", "Design"],
    year: "2026",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "What is A Mother's?",
        body: [
          "A Mother's is a platform with 2 purposes. Firstly, parents who are unable to meet their baby's milk demand can conect with verified mothers who produce and store excess milk. Secondly, mothers who produce excess milk can gain a revenue stream by selling their excess milk to parents in need.",
        ],
      },
      {
        type: "gallery",
        count: 2,
        items: [
          "/projects/a-mothers/primary_colors.webp",
          "/projects/a-mothers/secondary_colors.webp",
        ],
        caption: "Color Palette",
      },
      {
        type: "gallery",
        count: 3,
        items: [
          "/projects/a-mothers/logo_space_1.webp",
          "/projects/a-mothers/logo_space_2.webp",
          "/projects/a-mothers/logo_circles.webp",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/logo.webp"],
        caption: "Crafting the logo",
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/wordmark_space.webp"],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/wordmark.webp"],
        caption: "Crafting the wordmark",
      },
      {
        type: "section",
        eyebrow: "UX/UI",
        heading: "User centric design",
        body: [
          "After crafting the visual identity for the brand, our next step was focusing on designing the platform in an intuitive, user friendly manner.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/flow_diagram.webp"],
        caption: "User flow diagram",
      },
      {
        type: "section",
        eyebrow: "Finale",
        heading: "Culmination of a lengthy design process",
        body: [
          "Once the user flows are finalised and the wireframes are made, a long list of UX interviews are setup. With careful iterations, each user experience is refined to perfection.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/onboarding_screens.webp"],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/a-mothers/screens.webp"],
        caption: "A complete UX",
      },
    ],
  },
  camaradly: {
    title: "Camaradly",
    tagline: "Feedback, Engagement, and Alignment for Tech Services Companies",
    client: "Camaradly",
    services: ["Design"],
    year: "2021",
    projectUrl: "https://camaradly.com/",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "The Culture Management Platform",
        body: [
          "Organizations around the world trust Camaradly for a culture of high performance and employee engagement",
        ],
      },
      {
        type: "gallery",
        count: 2,
        items: [
          "/projects/camaradly/typography.png",
          "/projects/camaradly/color_palette.png",
        ],
        caption: "Visual Identity",
      },
      {
        type: "gallery",
        count: 3,
        items: [
          "/projects/camaradly/mock_1.png",
          "/projects/camaradly/mock_2.png",
          "/projects/camaradly/mock_3.png",
        ],
        caption: "Sneak Peek at the good stuff",
      },
    ],
  },
  "multipool-finance-website": {
    title: "Multipool Website",
    tagline: "the DEX with CEX appeal",
    client: "Immin8 Labs",
    services: ["Development"],
    year: "2023",
    projectUrl: "https://www.multipool.finance/",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "Dip into the future of trading",
        body: [
          "Multipool is a cutting-edge DEX transforming the trading landscape for RWAs and cryptocurrencies. Multipool is designed for fairness and equality, featuring a fully decentralized on-chain order book, deep liquidity through dynamic bracket pools, utilizing on-chain compliance tools.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/multipool-finance-website/homescreen.webp"],
      },
      {
        type: "section",
        eyebrow: "Development",
        heading: "NextJS all the way",
        body: [
          "The website was tasked to not just look amazing, but feel extraordinarily smooth. To ensure that, we built it from scratch using NextJS and powered it with custom GSAP animations to make it feel alive!",
        ],
      },
      {
        type: "gallery",
        count: 3,
        items: [
          "/projects/multipool-finance-website/image_1.webp",
          "/projects/multipool-finance-website/image_2.webp",
          "/projects/multipool-finance-website/image_3.webp",
        ],
        caption: "Sneak Peek",
      },
      {
        type: "section",
        eyebrow: "Development",
        heading: "Prismic to the rescue!",
        body: [
          "The client wanted to make the website dynamic. They wanted to pump out blogs every day! Create landing pages for marketing campaigns every week! You can't wait around for a dev team to push code all the time. So we landed on Prismic as a solution. The website was completely integrated with Prismic which acted not only as a CMS but also as a future page builder.",
        ],
      },
      {
        type: "gallery",
        count: 1,
        items: ["/projects/multipool-finance-website/blog_page.webp"],
        caption: "Sneak Peek at the blog",
      },
    ],
  },
  knot: {
    title: "Knot",
    tagline: "the DEX with CEX appeal",
    client: "Immin8 Labs",
    services: ["Development"],
    year: "2023",
    projectUrl: "https://www.multipool.finance/",
    blocks: [
      {
        type: "section",
        eyebrow: "Overview",
        heading: "Dip into the future of trading",
        body: [
          "Multipool is the ground breaking DeFi protocol for advanced trading. Trade crypto & RWAs with low fees, deep institutional liquidity, fully on-chain.",
        ],
      },
      {
        type: "gallery",
        count: 2,
        items: [
          "/projects/camaradly/typography.webp",
          "/projects/camaradly/color_palette.webp",
        ],
        caption: "Visual Identity",
      },
      {
        type: "gallery",
        count: 3,
        items: [
          "/projects/camaradly/mock_1.webp",
          "/projects/camaradly/mock_2.webp",
          "/projects/camaradly/mock_3.webp",
        ],
        caption: "Sneak Peek at the good stuff",
      },
    ],
  },
};

export const CASE_STUDIES: Record<string, CaseStudy> = Object.fromEntries(
  PROJECTS.map((project, i) => [
    project.slug,
    { ...buildCaseStudy(project, i), ...CASE_STUDY_OVERRIDES[project.slug] },
  ]),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
