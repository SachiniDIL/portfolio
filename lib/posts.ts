import "server-only";
import { getDb } from "./mongodb";
import type { Post } from "./types";

interface PostDocument {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: Post["coverImage"];
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  draft: boolean;
  readingTime: number;
  seo?: Post["seo"];
}

const COLLECTION = "posts";

function serialize(doc: PostDocument): Post {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage,
    tags: doc.tags ?? [],
    publishedAt: doc.publishedAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    draft: doc.draft,
    readingTime: doc.readingTime,
    seo: doc.seo ?? {},
  };
}

// Every reader here fails soft (empty result) rather than throwing, so the
// rest of the static site keeps building/rendering before Mongo is wired up
// or if Atlas is briefly unreachable — the blog just shows an empty state.

export async function getAllPosts(): Promise<Post[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<PostDocument>(COLLECTION)
      .find({ draft: false })
      .sort({ publishedAt: -1 })
      .toArray();
    return docs.map(serialize);
  } catch (err) {
    console.warn("[blog] getAllPosts failed:", (err as Error).message);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const db = await getDb();
    const doc = await db.collection<PostDocument>(COLLECTION).findOne({ slug, draft: false });
    return doc ? serialize(doc) : null;
  } catch (err) {
    console.warn("[blog] getPostBySlug failed:", (err as Error).message);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<PostDocument>(COLLECTION)
      .find({ draft: false }, { projection: { slug: 1, _id: 0 } })
      .toArray();
    return docs.map((d) => d.slug);
  } catch (err) {
    console.warn("[blog] getAllSlugs failed:", (err as Error).message);
    return [];
  }
}
