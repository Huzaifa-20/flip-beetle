import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/work/ProjectCard";
import ProjectGallery from "@/components/work/ProjectGallery";
import CaseStudyHero from "@/components/work/CaseStudyHero";
import Reveal from "@/components/work/Reveal";
import ScrollToTop from "@/components/work/ScrollToTop";
import LazyVideo from "@/components/ui/LazyVideo";
import { PROJECTS } from "@/data/projects";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
  type CaseStudy,
  type CaseStudyBlock,
} from "@/data/caseStudies";

const SITE_URL = "https://flipbeetle.com";

type Props = {
  params: Promise<{ "project-name": string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ "project-name": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "project-name": slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Project Not Found | Flip Beetle",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${study.title} | Work`,
    description: study.tagline,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${study.title} — ${study.client}`,
      description: study.tagline,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${study.client}`,
      description: study.tagline,
      images: ["/og-image.png"],
    },
  };
}

function CoverMedia({ study }: { study: CaseStudy }) {
  const cover = study.cover;
  const isVideo =
    typeof cover === "object"
      ? cover.type === "video"
      : /\.(mp4|webm|mov)$/i.test(cover);
  const src = typeof cover === "object" ? cover.src : cover;
  const poster = typeof cover === "object" ? cover.poster : undefined;

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 shadow-2xl">
      {isVideo ? (
        <LazyVideo
          src={src}
          poster={poster}
          alt={`${study.title} cover`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={`${study.title} cover`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      )}
    </div>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  if (block.type === "section") {
    return (
      <Reveal className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {block.eyebrow && (
          <p className="text-sm riposte font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-5">
            {block.eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl riposte text-white leading-tight mb-8">
          {block.heading}
        </h2>
        {block.body.map((paragraph, i) => (
          <p
            key={i}
            className="text-lg md:text-xl riposte text-white/70 leading-relaxed mb-6 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
    );
  }

  if (block.type === "gallery") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-10">
        <ProjectGallery count={block.count} items={block.items} />
        {block.caption && (
          <Reveal>
            <p className="text-sm riposte text-white/50 mt-5 text-center">
              {block.caption}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  if (block.type === "quote") {
    return (
      <Reveal className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <blockquote className="text-2xl md:text-3xl lg:text-4xl riposte text-white leading-snug mb-8">
          &ldquo;{block.quote}&rdquo;
        </blockquote>
        <div className="riposte">
          <span className="text-white font-semibold">{block.attribution}</span>
          {block.role && <span className="text-white/50"> — {block.role}</span>}
        </div>
      </Reveal>
    );
  }

  // stats
  return (
    <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {block.heading && (
        <p className="text-sm riposte font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-10">
          {block.heading}
        </p>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {block.items.map((stat, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl lg:text-6xl riposte text-white mb-3">
              {stat.value}
            </div>
            <div className="text-sm md:text-base riposte text-white/60 leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { "project-name": slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) => p.slug !== study.slug).slice(
    0,
    3,
  );

  return (
    <>
      <ScrollToTop />
      <main
        data-theme="black"
        className="min-h-screen w-screen bg-black pt-32 pb-24"
      >
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <nav className="flex items-center gap-2 text-sm riposte text-white/60">
            <Link
              href="/"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/work"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Work
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{study.title}</span>
          </nav>
        </div>

        {/* Hero (client island — handles its own stagger) */}
        <CaseStudyHero
          client={study.client}
          title={study.title}
          tagline={study.tagline}
          projectUrl={study.projectUrl}
        />

        {/* Meta */}
        <Reveal className="max-w-6xl mx-auto px-6 mb-14 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-10">
            <div>
              <p className="text-xs riposte uppercase tracking-widest text-white/40 mb-3">
                Client
              </p>
              <p className="riposte text-white">{study.client}</p>
            </div>
            <div>
              <p className="text-xs riposte uppercase tracking-widest text-white/40 mb-3">
                Services
              </p>
              <ul className="riposte text-white space-y-1">
                {study.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs riposte uppercase tracking-widest text-white/40 mb-3">
                Year
              </p>
              <p className="riposte text-white">{study.year}</p>
            </div>
          </div>
        </Reveal>

        {/* Cover */}
        <div className="max-w-6xl mx-auto px-6 mb-8 md:mb-12">
          <Reveal>
            <CoverMedia study={study} />
          </Reveal>
        </div>

        {/* Content blocks */}
        {study.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        {/* CTA */}
        <Reveal className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl riposte text-white mb-6 leading-tight">
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl riposte text-white/70 mb-10">
            Let&apos;s build something worth showing off.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black riposte font-semibold rounded-full hover:bg-white/90 transition-colors"
            >
              Start a project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Reveal>

        {/* Related work */}
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl riposte text-white">
              More work
            </h2>
            <Link
              href="/work"
              className="riposte text-sm text-white/60 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
            >
              See all work
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <Reveal
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            stagger={0.08}
          >
            {relatedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </Reveal>
        </div>
      </main>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          headline: study.title,
          description: study.tagline,
          creator: {
            "@type": "Organization",
            name: "Flip Beetle",
            url: SITE_URL,
          },
          about: study.client,
          keywords: study.services.join(", "),
          dateCreated: study.year,
          url: `${SITE_URL}/work/${slug}`,
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Work",
              item: `${SITE_URL}/work`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: study.title,
              item: `${SITE_URL}/work/${slug}`,
            },
          ],
        }}
      />
    </>
  );
}
