import Image from "next/image";
import Link from "next/link";
import React from "react";

import { footer_links, social_links } from "@/config";
import { AppStore, PlayStore } from "./app-download";

export const Footer = () => {
	return (
		<footer className="w-full bg-neutral-100 py-[60px]">
			<div className="container flex flex-wrap items-start gap-x-36 gap-y-10 px-4 lg:gap-y-0 lg:px-0">
				<div className="flex w-full min-w-[330px] flex-col gap-y-6 lg:w-[330px]">
					<Link href="/" className="relative h-[30px] w-[135px]">
						<Image src="/assets/images/classore.png" alt="classore" fill sizes="100%" />
					</Link>
					<div className="space-y-2">
						<p className="text-sm font-medium text-neutral-500">Download App</p>
						<div className="flex items-center gap-x-4">
							<AppStore />
							<PlayStore />
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-wrap items-start gap-y-5 lg:justify-between lg:gap-y-0">
					{footer_links.map(({ label, links }) => (
						<div key={label} className="flex w-full flex-col gap-y-5 lg:min-w-[200px]">
							{links.map(({ name, href }) => (
								<Link
									key={name}
									href={href}
									className="link text-sm font-medium text-neutral-500 hover:text-neutral-900">
									{name}
								</Link>
							))}
						</div>
					))}
					<div className="flex-1 space-y-6">
						<p className="text-sm font-medium text-neutral-500">Follow Us</p>
						<div className="flex items-center gap-x-4">
							{social_links.map(({ icon: Icon, label, url }) => (
								<a
									key={label}
									href={url}
									target="_blank"
									className="transition-colors duration-500 hover:text-primary-400">
									<Icon />
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
