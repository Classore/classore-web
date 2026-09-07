import Link from "next/link";
import { GraduationCap, BookOpen, Globe, MessageCircle, Award, ArrowRight, type LucideIcon } from "lucide-react";

type Exam = {
  name: string;
  subtitle: string;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "violet" | "pink";
};

const exams: Exam[] = [
  { name: "JAMB", subtitle: "UTME Practice", icon: GraduationCap, color: "green" },
  { name: "WAEC", subtitle: "School Practice", icon: BookOpen, color: "blue" },
  { name: "IELTS", subtitle: "Academic Test", icon: Globe, color: "orange" },
  { name: "TOEFL", subtitle: "Test Preparation", icon: MessageCircle, color: "violet" },
  { name: "NECO", subtitle: "School Practice", icon: Award, color: "pink" },
];

const colorMap: Record<Exam["color"], { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  violet: { bg: "bg-violet-100", text: "text-violet-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
};

export default function TestCenter() {
  return (
    <section id="exams" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Test Center</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Prepare for Your Exams</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Practice with real exam simulations and detailed performance analysis.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {exams.map((exam) => {
          const c = colorMap[exam.color];
          return (
            <Link
              key={exam.name}
              href={`https://test.classore.com/contest/(tabs)/practice?exam=${exam.name.toLowerCase()}`}
              className="group flex flex-col justify-between rounded-2xl border border-gray-100 p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md cursor-pointer bg-white"
            >
              <div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} transition-transform duration-200 group-hover:scale-105`}>
                  <exam.icon className={`h-5 w-5 ${c.text}`} />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{exam.name}</h3>
                <p className="text-sm text-gray-500">{exam.subtitle}</p>
              </div>
              <div className="mt-5 flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-sm font-semibold text-violet-700 group-hover:underline">
                  Practice Now →
                </span>
                <span
                  aria-label={`Practice ${exam.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition group-hover:border-violet-700 group-hover:bg-violet-50 group-hover:text-violet-700"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="https://test.classore.com/contest/(tabs)/practice"
          className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          View All Exams
        </Link>
      </div>
    </section>
  );
}
