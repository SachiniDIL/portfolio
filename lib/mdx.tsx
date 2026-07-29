import type { ComponentProps } from "react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

const linkClasses =
  "border-b border-line text-paper transition-colors duration-200 hover:border-crimson hover:text-crimson";

const mdxComponents: MDXRemoteProps["components"] = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="display mt-12 text-[clamp(32px,5vw,52px)] leading-[1]" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="display mt-10 text-[clamp(26px,4vw,40px)] leading-[1.05]" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="display mt-8 text-[clamp(22px,3vw,30px)] leading-[1.1]" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-5 text-[16px] leading-[1.8] text-body" {...props} />
  ),
  a: ({ href, ...props }: ComponentProps<"a">) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className={linkClasses}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...props}
      />
    );
  },
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-[1.8] text-body" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-[16px] leading-[1.8] text-body"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 border-crimson pl-5 text-[16px] italic text-muted" {...props} />
  ),
  hr: (props: ComponentProps<"hr">) => <hr className="my-10 border-line" {...props} />,
  // rehype-highlight adds a className only to fenced/highlighted code — plain
  // inline `code` spans get none, which is how we tell the two apart.
  code: ({ className, ...props }: ComponentProps<"code">) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="rounded-sm bg-bg2 px-1.5 py-0.5 font-mono text-[0.85em] text-gold"
        {...props}
      />
    ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto border border-line bg-bg2 p-5 font-mono text-[13px] leading-[1.7]"
      {...props}
    />
  ),
  img: ({ src, alt }: ComponentProps<"img">) =>
    typeof src === "string" ? (
      <span className="mt-6 block border border-line bg-bg2 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- content images have unknown dimensions at compile time */}
        <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="h-auto w-full" />
      </span>
    ) : null,
  table: (props: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto border border-line">
      <table className="w-full border-collapse text-[14px]" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="border-b border-line bg-bg2 px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.1em] text-gold"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-b border-line px-4 py-2.5 text-body" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => <strong className="text-paper" {...props} />,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeHighlight,
          ],
        },
      }}
    />
  );
}
