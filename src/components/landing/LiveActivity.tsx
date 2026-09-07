import Image from "next/image";
import Link from "next/link";
import { Users, GraduationCap, Award, MessageCircle, type LucideIcon } from "lucide-react";

type Activity = {
  kind: "stat" | "person" | "icon";
  value?: string;
  label?: string;
  avatar?: number;
  name?: string;
  text?: string;
  sub?: string;
  time?: string;
  icon?: LucideIcon;
  color?: "green" | "orange" | "pink";
};

const activities: Activity[] = [
  { kind: "stat", value: "1,248", label: "Learners active now" },
  {
    kind: "person",
    avatar: 9,
    name: "Janet",
    text: "scored 342/400",
    sub: "in JAMB Practice",
    time: "2m ago",
  },
  {
    kind: "icon",
    icon: GraduationCap,
    color: "green",
    name: "David",
    text: "completed Mathematics",
    sub: "Topic: Trigonometry",
    time: "5m ago",
  },
  {
    kind: "icon",
    icon: Award,
    color: "orange",
    name: "Sarah",
    text: "achieved Band 8.0",
    sub: "in IELTS Practice",
    time: "8m ago",
  },
  {
    kind: "icon",
    icon: MessageCircle,
    color: "pink",
    name: "Michael",
    text: "joined a Physics Discussion",
    time: "10m ago",
  },
];

const colorMap: Record<NonNullable<Activity["color"]>, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
};

export default function LiveActivity() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Live Activity</p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Real People. Real Progress.</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            See what learners are achieving on Classore right now.
          </p>
        </div>

        <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {activities.map((a, i) => (
            <div key={i} className="w-56 shrink-0 rounded-2xl border border-gray-100 bg-white p-5 lg:w-auto">
              {a.kind === "stat" && (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    <Users className="h-5 w-5 text-violet-700" />
                  </div>
                  <p className="mt-3 text-2xl font-extrabold text-gray-900">{a.value}</p>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {a.label}
                  </p>
                </>
              )}

              {a.kind === "person" && (
                <>
                  <Image
                    src={`https://i.pravatar.cc/64?img=${a.avatar}`}
                    alt={a.name ?? "Classore learner"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <p className="mt-3 text-sm text-gray-700">
                    <span className="font-bold text-gray-900">{a.name}</span> {a.text}
                  </p>
                  <p className="text-xs text-gray-400">{a.sub}</p>
                  <p className="mt-2 text-[11px] text-gray-400">{a.time}</p>
                </>
              )}

              {a.kind === "icon" && a.icon && a.color && (
                <>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[a.color].bg}`}>
                    <a.icon className={`h-5 w-5 ${colorMap[a.color].text}`} />
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    <span className="font-bold text-gray-900">{a.name}</span> {a.text}
                  </p>
                  {a.sub && <p className="text-xs text-gray-400">{a.sub}</p>}
                  <p className="mt-2 text-[11px] text-gray-400">{a.time}</p>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/signin"
            className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Explore Community
          </Link>
        </div>
      </div>
    </section>
  );
}
