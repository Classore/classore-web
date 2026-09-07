import { PlayCircle, ClipboardList, Brain, Users, TrendingUp, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const features: Feature[] = [
  { icon: PlayCircle, title: "Video Lessons", desc: "Learn with easy-to-understand video lessons." },
  { icon: ClipboardList, title: "CBT Practice", desc: "Practice unlimited questions with real exam simulation." },
  { icon: Brain, title: "AI Tutor", desc: "Get AI-powered explanations and personalized help." },
  { icon: Users, title: "Community", desc: "Learn with others, ask questions and get help." },
  { icon: TrendingUp, title: "Track Progress", desc: "Monitor your progress and improve every day." },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-3xl bg-gray-50 px-6 py-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-5">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
              <f.icon className="h-6 w-6 text-violet-700" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-gray-900">{f.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
