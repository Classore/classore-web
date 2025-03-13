import { RiDownload2Line, RiMenu3Fill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ModalArt } from "@/assets/illustrations";
import { XClose } from "@untitled-ui/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const links = [
  { name: "What We Offer", href: "what-we-offer" },
  { name: "Testimonials", href: "testimonials" },
  { name: "FAQS", href: "frequently-asked-questions" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  const handleScrolled = () => setScrolled(window.scrollY > 0);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-0 !z-50 flex w-full -translate-x-1/2 items-center justify-between py-4 transition-all duration-500 ${scrolled ? "border-b border-b-neutral-200 bg-white/75 backdrop-blur-sm" : "bg-transparent"}`}
    >
      {/* Desktop navbar */}
      <nav className="container hidden px-2 lg:flex lg:items-center lg:justify-between">
        <Link href="/" className="relative h-[30px] w-[135px]">
          <Image
            src="/assets/images/classore.png"
            alt="classore"
            fill
            sizes="100%"
          />
        </Link>
        <div className="flex items-center gap-x-4">
          {links.map(({ name, href }) => (
            <a
              href={`#${href}`}
              key={name}
              className="link text-sm font-medium transition-colors duration-500 hover:text-primary-400"
            >
              {name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            asChild
            variant="ghost"
            className="text-secondary-300 md:!text-sm hover:bg-secondary-100"
          >
            <Link href="/signin">Start Learning</Link>
          </Button>
          <Button variant="outline-primary" className="md:!text-sm py-2">
            <RiDownload2Line /> Download App
          </Button>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="container px-3 flex items-center justify-between lg:hidden">
        <Link href="/" className="relative h-[30px] w-[135px]">
          <Image
            src="/assets/images/classore.png"
            alt="classore"
            fill
            sizes="100%"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button type="button">
              <RiMenu3Fill size={20} />
            </button>
          </SheetTrigger>

          <SheetContent className="modal-primary flex w-[80%] flex-col gap-4 py-4">
            <div className="absolute -top-80 left-0 z-30">
              <ModalArt />
            </div>

            <SheetClose className="z-30 ml-auto grid size-7 place-items-center rounded-full bg-white">
              <XClose height={18} width={18} />
            </SheetClose>

            <ul className="relative z-50 py-4 flex gap-4 w-full flex-col">
              {links.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={`#${href}`}
                    className="link text-sm p-2 font-medium transition-colors duration-500 hover:text-primary-400"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex w-full pt-4 flex-col gap-4 border-t border-t-neutral-200">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="text-secondary-300 bg-transparent border-secondary-300"
              >
                <Link href="/signin">Start Learning</Link>
              </Button>
              <Button size="sm" variant="outline-primary">
                <RiDownload2Line /> Download App
              </Button>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
