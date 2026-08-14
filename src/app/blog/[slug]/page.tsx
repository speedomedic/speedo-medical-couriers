import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Calendar, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Speedo Medical Couriers Blog`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://speedomedic.ca";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "url": `${siteUrl}/blog/${post.slug}`,
    "author": {
      "@type": "Organization",
      "name": "Speedo Medical Couriers",
      "url": siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Speedo Medical Couriers",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo-horizontal-transparent.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    "articleSection": post.category,
    "keywords": (post as Record<string, unknown>).focusKeyword as string | undefined,
  };

  return (
    <main className="pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Header */}
      <section className="bg-[var(--color-brand-navy)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-white/10 px-3 py-1.5 rounded-full">
              <Tag size={11} /> {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Clock size={11} /> {post.readMin} min read
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Calendar size={11} /> {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Cover image */}
      <div className="relative h-72 lg:h-96 max-w-4xl mx-auto -mt-8 mx-4 sm:mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Article body */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-text-muted)] prose-p:leading-relaxed prose-a:text-[var(--color-brand-blue)] prose-strong:text-[var(--color-text)]"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[var(--color-brand-blue-pale)] rounded-2xl p-6 sticky top-28">
              <h3 className="text-sm font-black text-[var(--color-text)] mb-2">Need a medical courier?</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">
                Speedo Medical delivers to Edmonton pharmacies, labs, hospitals, and patients every day.
              </p>
              <Link
                href="/partner"
                className="flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-[var(--color-brand-blue-dark)] transition-all"
              >
                Register Your Business <ArrowRight size={13} />
              </Link>
              <a
                href="tel:7808070000"
                className="flex items-center justify-center gap-2 mt-2 text-sm font-semibold text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/30 px-4 py-3 rounded-xl hover:bg-white transition-all"
              >
                Call (780) 807-0000
              </a>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:border-[var(--color-brand-blue)] transition-all"
                >
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-500">
                    <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-brand-blue)]">{p.category}</span>
                    <h3 className="text-sm font-black text-[var(--color-text)] mt-1 leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
