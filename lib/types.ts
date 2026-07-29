export interface CoverImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostSeo {
  title?: string;
  description?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: CoverImage;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  draft: boolean;
  readingTime: number;
  seo: PostSeo;
}
