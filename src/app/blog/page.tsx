import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Logistics Blog | Speedo Medical Couriers",
  description: "Insights on medical courier best practices, specimen transport, pharmacy delivery, and healthcare logistics in Edmonton, Alberta.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 relative overflow-hidden mb-0">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            ✦ Healthcare Logistics Insights
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
            The Speedo Medical<br />
            <span className="text-amber-400">Knowledge Hub</span>
          </h1>
          <p className="text-xl text-white/70 max-w-xl mx-auto">
            Expert articles on specimen transport, cold-chain delivery, pharmacy logistics, and healthcare best practices in Edmonton.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all">
              <div className="relative h-64 lg:h-full min-h-[280px] bg-gradient-to-br from-blue-600 to-indigo-500 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    Latest Post
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-3 py-1 rounded-full">
                    <Tag size={11} /> {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                    <Clock size={11} /> {featured.readMin} min read
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[var(--color-text)] mb-3 group-hover:text-[var(--color-brand-blue)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] group-hover:gap-3 transition-all">
                  Read article <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div>
          <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">All Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-[var(--color-brand-blue)] transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-500 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                      <Clock size={9} /> {post.readMin} min
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[var(--color-text)] mb-2 leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
