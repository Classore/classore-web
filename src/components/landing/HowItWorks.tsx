import { Target, PlayCircle, FileText, TrendingUp, Trophy, type LucideIcon } from "lucide-react";

type Step = {
  num: number;
  icon: LucideIcon;
  title: string;
  desc: string;
  bg: string;
  fg: string;
};

const steps: Step[] = [
  {
    num: 1,
    icon: Target,
    title: "Choose Your Goal",
    desc: "Pick an exam or subject you want to master.",
    bg: "bg-violet-100",
    fg: "text-violet-700",
  },
  {
    num: 2,
    icon: PlayCircle,
    title: "Learn & Understand",
    desc: "Watch video lessons and learn at your pace.",
    bg: "bg-blue-100",
    fg: "text-blue-600",
  },
  {
    num: 3,
    icon: FileText,
    title: "Practice & Test",
    desc: "Take CBTs and practice with real exam questions.",
    bg: "bg-amber-100",
    fg: "text-amber-600",
  },
  {
    num: 4,
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Get detailed analytics and see your improvement.",
    bg: "bg-green-100",
    fg: "text-green-600",
  },
  {
    num: 5,
    icon: Trophy,
    title: "Achieve Your Best",
    desc: "Stay consistent and achieve your goals.",
    bg: "bg-pink-100",
    fg: "text-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">How Classore Works</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Simple Steps. Smarter Results.</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">Everything you need to learn, practice and improve.</p>
      </div>

      <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <div className="absolute left-[10%] right-[10%] top-4 hidden border-t-2 border-dashed border-gray-200 lg:block" />
        {steps.map((s) => (
          <div key={s.num} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-violet-700 text-xs font-bold text-white">
              {s.num}
            </div>
            <div className={`mt-4 flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg}`}>
              <s.icon className={`h-6 w-6 ${s.fg}`} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-gray-900">{s.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
