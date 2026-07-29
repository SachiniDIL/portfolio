import { config } from "dotenv";
import path from "node:path";
import { MongoClient } from "mongodb";

// Next.js reads .env.local by convention; plain dotenv only reads .env by
// default, so load .env.local explicitly to match where the real secrets live.
config({ path: path.resolve(process.cwd(), ".env.local"), quiet: true });

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npm run blog:unpublish -- <slug>");
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to .env.local — see .env.example.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const result = await db
      .collection("posts")
      .updateOne({ slug }, { $set: { draft: true, updatedAt: new Date() } });

    if (result.matchedCount === 0) {
      console.error(`No post found with slug "${slug}".`);
      process.exit(1);
    }
    console.log(`✔ Marked "${slug}" as draft — it will no longer appear on the site.`);
  } finally {
    await client.close();
  }

  const revalidateSecret = process.env.REVALIDATE_SECRET;
  const siteUrl = process.env.SITE_URL;
  if (revalidateSecret && siteUrl) {
    try {
      const url = `${siteUrl.replace(/\/$/, "")}/api/revalidate?secret=${encodeURIComponent(revalidateSecret)}&slug=${encodeURIComponent(slug)}`;
      await fetch(url);
      console.log("✔ Revalidated the live site.");
    } catch {
      console.warn("⚠ Could not reach the live site to revalidate — it'll catch up on the next ISR cycle.");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
