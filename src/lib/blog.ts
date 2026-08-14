import { list, head } from "@vercel/blob";
import seedPosts from "@/content/blog-seed.json";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMin: number;
  image: string;
  body: string;
};

async function getDynamicPosts(): Promise<BlogPost[]> {
  // Only available when BLOB_READ_WRITE_TOKEN is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: "blog/", token: process.env.BLOB_READ_WRITE_TOKEN });
    const posts = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.url);
        return res.json() as Promise<BlogPost>;
      })
    );
    return posts;
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const dynamic = await getDynamicPosts();
  const combined = [
    ...dynamic,
    ...(seedPosts as BlogPost[]),
  ];
  // Deduplicate by slug, dynamic posts win
  const seen = new Set<string>();
  const deduped = combined.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
  // Sort newest first
  return deduped.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Check dynamic posts first
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blobUrl = `blog/${slug}.json`;
      const meta = await head(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
      if (meta) {
        const res = await fetch(meta.url);
        return res.json();
      }
    } catch {
      // Fall through to seed data
    }
  }
  const post = (seedPosts as BlogPost[]).find((p) => p.slug === slug);
  return post ?? null;
}
