import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    badge: "Education Tips",
    title: "5 Smart Ways to Prepare for JAMB and Score High",
    date: "May 12, 2025",
    readTime: "5 min read",
    seed: "classore-blog-1",
  },
  {
    badge: "IELTS Guide",
    title: "IELTS Writing Tips to Get Band 7.0 and Above",
    date: "May 9, 2025",
    readTime: "6 min read",
    seed: "classore-blog-2",
  },
  {
    badge: "Platform Update",
    title: "New Feature: AI Tutor is Now on Classore",
    date: "May 5, 2025",
    readTime: "3 min read",
    seed: "classore-blog-3",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Latest From Classore</p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Tips, Updates & Insights</h2>
          <p className="mt-3 max-w-xl text-gray-500">
            Stay informed with the latest education tips and platform updates.
          </p>
        </div>
        <Link href="/dashboard/blog" className="shrink-0 text-sm font-semibold text-violet-700 hover:underline">
          View all articles →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.title}
            href="/dashboard/blog"
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md block"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/${post.seed}/500/300`}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-violet-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {post.badge}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-violet-700">
                {post.title}
              </h3>
              <p className="mt-3 text-xs text-gray-400">
                {post.date} · {post.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
