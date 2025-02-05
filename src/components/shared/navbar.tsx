import { RiDownload2Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";

const links = [
	{ name: "What We Offer", href: "/what-we-offer" },
	{ name: "Testimonials", href: "/testimonials" },
	{ name: "FAQS", href: "/frequently-asked-questions" },
];

export const Navbar = () => {
	const [scrolled, setScrolled] = React.useState(false);

	const handleScrolled = () => setScrolled(window.scrollY > 400);

	React.useEffect(() => {
		window.addEventListener("scroll", handleScrolled);
		return () => window.removeEventListener("scroll", handleScrolled);
	}, []);

	return (
		<header
			className={`fixed left-1/2 top-0 !z-50 flex w-full -translate-x-1/2 items-center justify-between py-6 transition-all duration-500 ${scrolled ? "bg-primary-100 shadow-xl" : "bg-transparent"}`}>
			<nav className="container flex items-center justify-between">
				<Link href="/" className="relative h-[30px] w-[135px]">
					<Image src="/assets/images/classore.png" alt="classore" fill sizes="100%" />
				</Link>
				<div className="flex items-center gap-x-4">
					{links.map(({ href, name }) => (
						<Link
							key={name}
							href={href}
							className="link text-sm font-medium transition-colors duration-500 hover:text-primary-400">
							{name}
						</Link>
					))}
				</div>
				<div className="flex items-center gap-x-4">
					<Button asChild size="sm" variant="ghost" className="shadow-none">
						<Link href="/signup">Start Learning</Link>
					</Button>
					<Button size="sm" variant="outline-primary">
						<RiDownload2Line /> Download App
					</Button>
				</div>
			</nav>
		</header>
	);
};
