import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/classoreapp", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/classore", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/classoreapp", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/classore", label: "LinkedIn" },
];

const columns = [
  {
    title: "Platform",
    links: [
      { name: "Exams", href: "#exams" },
      { name: "Features", href: "#features" },
      { name: "Contests", href: "#contests" },
      { name: "Pricing", href: "#pricing" },
      { name: "How it Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/dashboard/blog" },
      { name: "Help Center", href: "/support" },
      { name: "Study Tips", href: "/dashboard/study-guides" },
      { name: "Terms of Use", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#how-it-works" },
      { name: "Contact Us", href: "/support" },
      { name: "Careers", href: "/support" },
      { name: "For Schools", href: "/signup/parent" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thank you for subscribing to Classore updates!");
    setEmail("");
  };

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="relative flex h-8 w-32 items-center">
              <Image
                src="/assets/images/classore.png"
                alt="Classore"
                fill
                sizes="130px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Your all-in-one learning and test preparation platform. Learn. Practice. Succeed.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-violet-700 hover:text-violet-700 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-gray-900">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-violet-700 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-bold text-gray-900">Stay Updated</h4>
            <p className="mt-4 text-sm text-gray-500">Subscribe to get the latest updates and learning tips.</p>
            <form onSubmit={handleSubscribe} className="mt-4 flex overflow-hidden rounded-lg border border-gray-200">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full min-w-0 px-3 py-2.5 text-sm text-gray-700 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 items-center gap-1.5 bg-violet-700 px-4 text-sm font-semibold text-white hover:bg-violet-800 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row">
          <p>© 2025 Classore. All rights reserved.</p>
          <p>Made with ❤️ for learners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
