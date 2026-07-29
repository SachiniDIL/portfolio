import { config } from "dotenv";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import readingTime from "reading-time";
import slugify from "slugify";
import { MongoClient } from "mongodb";

// Next.js reads .env.local by convention; plain dotenv only reads .env by
// default, so load .env.local explicitly to match where the real secrets live.
config({ path: path.resolve(process.cwd(), ".env.local"), quiet: true });

interface Frontmatter {
  title: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  coverImage: string;
  coverImageAlt?: string;
  tags?: string[];
  draft?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

function fail(message: string): never {
  console.error(`✖ ${message}`);
  process.exit(1);
}

function deriveExcerpt(body: string): string {
  const firstParagraph = body
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith("#"));
  return (firstParagraph ?? "").slice(0, 200);
}

async function main() {
  const inputArg = process.argv[2];
  if (!inputArg) {
    fail("Usage: npm run blog:publish -- <path-to-post-folder>\n  e.g. npm run blog:publish -- content/blog/my-first-post");
  }

  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) fail("MONGODB_URI is not set. Add it to .env.local — see .env.example.");

  const postDir = path.resolve(process.cwd(), inputArg);
  const mdxPath = path.join(postDir, "index.mdx");

  let raw: string;
  try {
    raw = await readFile(mdxPath, "utf8");
  } catch {
    fail(`Could not read ${mdxPath} — expected an index.mdx inside the post folder.`);
  }

  const { data, content } = matter(raw);
  const frontmatter = data as Partial<Frontmatter>;

  if (!frontmatter.title) fail("Frontmatter is missing required field: title");
  if (!frontmatter.coverImage) fail("Frontmatter is missing required field: coverImage");
  if (!content.trim()) fail("Post body is empty.");

  const slug = slugify(frontmatter.slug ?? frontmatter.title, { lower: true, strict: true });

  console.log(`Publishing "${frontmatter.title}" as /blog/${slug} ...`);

  // --- Cover image ---
  // Either a root-relative path already sitting in public/ (e.g. "/blog/1.png"
  // placed there by hand — used as-is, not moved or renamed), or a source
  // file next to index.mdx (e.g. "./cover.jpg" — copied into public/blog/).
  let coverImage: { url: string; alt: string; width: number; height: number };
  let publicImageNote: string;

  if (frontmatter.coverImage.startsWith("/")) {
    const publicPath = path.resolve(process.cwd(), "public", frontmatter.coverImage.replace(/^\//, ""));
    let imageBuffer: Buffer;
    try {
      imageBuffer = await readFile(publicPath);
    } catch {
      fail(`coverImage is "${frontmatter.coverImage}" but no file exists at ${publicPath}.`);
    }
    const { width, height } = imageSize(imageBuffer);
    coverImage = {
      url: frontmatter.coverImage,
      alt: frontmatter.coverImageAlt ?? frontmatter.title,
      width,
      height,
    };
    publicImageNote = frontmatter.coverImage;
  } else {
    const coverImagePath = path.resolve(postDir, frontmatter.coverImage);
    let imageBuffer: Buffer;
    try {
      imageBuffer = await readFile(coverImagePath);
    } catch {
      fail(`Could not read cover image at ${coverImagePath}.`);
    }
    const { width, height } = imageSize(imageBuffer);
    const ext = path.extname(coverImagePath) || ".jpg";
    const destDir = path.resolve(process.cwd(), "public", "blog");
    await mkdir(destDir, { recursive: true });
    const destFile = `${slug}${ext}`;
    await writeFile(path.join(destDir, destFile), imageBuffer);
    coverImage = {
      url: `/blog/${destFile}`,
      alt: frontmatter.coverImageAlt ?? frontmatter.title,
      width,
      height,
    };
    publicImageNote = `/blog/${destFile}`;
  }

  // --- Derived fields ---
  const stats = readingTime(content);
  const excerpt = frontmatter.excerpt ?? deriveExcerpt(content);
  const now = new Date();

  // --- Upsert into MongoDB, keyed on slug ---
  const client = new MongoClient(mongodbUri);
  let wasExisting = false;
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const collection = db.collection("posts");
    wasExisting = (await collection.findOne({ slug }, { projection: { _id: 1 } })) !== null;

    await collection.updateOne(
      { slug },
      {
        $set: {
          slug,
          title: frontmatter.title,
          excerpt,
          content,
          coverImage,
          tags: frontmatter.tags ?? [],
          draft: frontmatter.draft ?? false,
          readingTime: Math.max(1, Math.ceil(stats.minutes)),
          updatedAt: now,
          seo: {
            title: frontmatter.seoTitle,
            description: frontmatter.seoDescription,
          },
        },
        $setOnInsert: {
          publishedAt: frontmatter.date ? new Date(frontmatter.date) : now,
        },
      },
      { upsert: true }
    );
  } finally {
    await client.close();
  }

  console.log(`✔ ${wasExisting ? "Updated" : "Published"}: /blog/${slug}`);

  // --- Best-effort instant revalidation; ISR is the fallback either way ---
  const revalidateSecret = process.env.REVALIDATE_SECRET;
  const siteUrl = process.env.SITE_URL;
  if (revalidateSecret && siteUrl) {
    try {
      const url = `${siteUrl.replace(/\/$/, "")}/api/revalidate?secret=${encodeURIComponent(revalidateSecret)}&slug=${encodeURIComponent(slug)}`;
      const res = await fetch(url);
      console.log(res.ok ? "✔ Revalidated the live site." : `⚠ Revalidation returned ${res.status} — it'll catch up on the next ISR cycle.`);
    } catch {
      console.warn("⚠ Could not reach the live site to revalidate — it'll catch up on the next ISR cycle.");
    }
  } else {
    console.log("ℹ SITE_URL / REVALIDATE_SECRET not set — skipping instant revalidation (ISR will catch up).");
  }

  console.log(
    `ℹ The cover image lives at public${publicImageNote}. Commit and push it if it isn't already — the post text updates live via Mongo, but the image is a static file and only appears once it's deployed.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
