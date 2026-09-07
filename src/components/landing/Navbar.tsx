"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = {
  label: string;
  sectionId?: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Exams",
    sectionId: "exams",
    dropdown: [
      { label: "JAMB", href: "https://test.classore.com/contest/(tabs)/practice?exam=jamb" },
      { label: "WAEC", href: "https://test.classore.com/contest/(tabs)/practice?exam=waec" },
      { label: "IELTS", href: "https://test.classore.com/contest/(tabs)/practice?exam=ielts" },
      { label: "TOEFL", href: "https://test.classore.com/contest/(tabs)/practice?exam=toefl" },
      { label: "NECO", href: "https://test.classore.com/contest/(tabs)/practice?exam=neco" },
    ],
  },
  { label: "Features", sectionId: "features" },
  { label: "Contests", sectionId: "contests" },
  { label: "Pricing", sectionId: "pricing" },
  { label: "Blog", sectionId: "blog" },
  { label: "About", sectionId: "how-it-works" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);

  const isHomePage = router?.pathname === "/";

  const getLinkHref = (link: NavLink) => {
    if (link.href) return link.href;
    if (link.sectionId) {
      return isHomePage ? `#${link.sectionId}` : `/#${link.sectionId}`;
    }
    return "/";
  };

  const isLinkActive = (link: NavLink) => {
    if (link.href === "/" && isHomePage) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative flex h-8 w-32 items-center">
          <Image
            src="/assets/images/classore.png"
            alt="Classore"
            fill
            sizes="130px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setExamsOpen(true)}
              onMouseLeave={() => link.dropdown && setExamsOpen(false)}
            >
              <Link
                href={getLinkHref(link)}
                className={`flex items-center gap-1 border-b-2 pb-1 text-sm font-medium transition-colors ${
                  isLinkActive(link)
                    ? "border-violet-700 text-violet-700"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>

              {link.dropdown && examsOpen && (
                <div className="absolute left-0 top-full z-10 w-40 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-800"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="text-gray-700 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="border-t border-gray-100 px-4 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={getLinkHref(link)}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isLinkActive(link) ? "bg-violet-50 text-violet-700" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/signin"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center rounded-lg bg-violet-700 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
