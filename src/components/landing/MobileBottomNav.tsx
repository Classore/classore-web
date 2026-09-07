import Link from "next/link";
import { FileText, Trophy, Home, BookOpen, User, type LucideIcon } from "lucide-react";

const items: { label: string; href: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Exams", href: "#exams", icon: FileText },
  { label: "Contests", href: "#contests", icon: Trophy },
  { label: "Home", href: "/", icon: Home, active: true },
  { label: "Study", href: "/signin", icon: BookOpen },
  { label: "Profile", href: "/signin", icon: User },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white py-2 lg:hidden">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium ${
            item.active ? "text-violet-700" : "text-gray-400 hover:text-violet-700"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
