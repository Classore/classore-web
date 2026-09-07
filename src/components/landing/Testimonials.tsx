import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amaka O.",
    tag: "JAMB 2024 Top Scorer",
    quote: "Classore helped me go from guessing to understanding. The CBTs and explanations are unbeatable!",
    avatar: 47,
  },
  {
    name: "David K.",
    tag: "IELTS Band 8.0",
    quote: "The mock tests and AI feedback improved my writing and speaking so much. Highly recommended!",
    avatar: 14,
  },
  {
    name: "Sarah U.",
    tag: "WAEC 8 Distinctions",
    quote: "I love the video lessons and how easy it is to track my progress. Classore is the real deal!",
    avatar: 26,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Top Students, Real Results</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Loved by Thousands of Learners</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">Here&apos;s what students are saying about Classore.</p>
      </div>

      <div className="no-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="w-[85%] shrink-0 snap-center rounded-2xl border border-gray-100 p-6 shadow-sm sm:w-auto"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://i.pravatar.cc/64?img=${t.avatar}`}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs font-medium text-violet-700">{t.tag}</p>
                </div>
              </div>
              <Quote className="h-6 w-6 shrink-0 text-violet-100" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{t.quote}</p>
            <div className="mt-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-violet-700" : "w-1.5 bg-gray-200"}`}
          />
        ))}
      </div>
    </section>
  );
}
