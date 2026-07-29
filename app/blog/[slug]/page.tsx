import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/lib/mdx";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? post.excerpt;
  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: `${title} — ${site.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: post.coverImage.url,
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt: post.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage.url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <main id="main" className="px-[6vw] pb-[110px] pt-[calc(56px+70px)] md:pt-[calc(56px+110px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[720px]">
        <Link
          href="/blog"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-crimson"
        >
          ← The Log
        </Link>

        <h1 className="display mt-6 text-[clamp(36px,7vw,64px)] leading-[0.95]">{post.title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span className="text-gold">{post.tags.map((t) => `#${t}`).join(" ")}</span>
            </>
          )}
        </div>

        <div className="relative mt-10 aspect-[1.91/1] w-full overflow-hidden border border-line">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-4">
          <MDXContent source={post.content} />
        </div>
      </article>
    </main>
  );
}
