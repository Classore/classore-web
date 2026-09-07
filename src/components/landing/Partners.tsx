"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Shield, GraduationCap, Building2, Landmark, Eye, type LucideIcon } from "lucide-react";

type Partner = {
  name: string;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "cyan" | "violet";
};

const partners: Partner[] = [
  { name: "Greenfield College", icon: Shield, color: "green" },
  { name: "Royal Scholars Academy", icon: GraduationCap, color: "blue" },
  { name: "Excel High School", icon: Building2, color: "orange" },
  { name: "Bright Future Academy", icon: Landmark, color: "cyan" },
  { name: "Visionary College", icon: Eye, color: "violet" },
];

const colorMap: Record<Partner["color"], string> = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
  cyan: "bg-cyan-100 text-cyan-600",
  violet: "bg-violet-100 text-violet-600",
};

export default function Partners() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">
          Trusted by Schools & Institutions
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Partnering for Better Education</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">We work with forward-thinking schools and organizations.</p>
      </div>

      <div className="relative mt-10 flex items-center gap-3">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div ref={scrollerRef} className="no-scrollbar flex flex-1 gap-4 overflow-x-auto scroll-smooth">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex w-48 shrink-0 items-center gap-3 rounded-2xl border border-gray-100 px-4 py-4"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[p.color]}`}>
                <p.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-gray-800">{p.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
