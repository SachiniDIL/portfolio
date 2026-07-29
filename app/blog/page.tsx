import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const revalidate = 3600;

const description = "Notes on building software — real projects, real tradeoffs.";

export const metadata: Metadata = {
  title: `The Log — ${site.name}`,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `The Log — ${site.name}`,
    description,
    url: `${site.url}/blog`,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main
      id="main"
      className="min-h-screen px-[6vw] pb-[110px] pt-[calc(56px+70px)] md:pt-[calc(56px+110px)]"
    >
      <p className="eyebrow-dot flex items-center gap-2.5 font-mono text-[13px] tracking-[0.25em] text-gold">
        the log
      </p>
      <h1 className="display mt-6 text-[clamp(48px,10vw,120px)] leading-[0.88]">
        Field
        <br />
        notes.
      </h1>

      {posts.length === 0 ? (
        <p className="mt-14 max-w-[520px] font-mono text-[13px] leading-[1.8] text-muted">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group -ml-px -mt-px flex flex-col border border-line bg-bg transition-colors duration-300 hover:bg-bg2"
            >
              <div className="relative aspect-[1.91/1] w-full overflow-hidden border-b border-line">
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {" · "}
                  {post.readingTime} min read
                </p>
                <h2 className="display mt-3 text-[24px] leading-[1.05] text-paper transition-colors duration-200 group-hover:text-crimson">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-body">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
