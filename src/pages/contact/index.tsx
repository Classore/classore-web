import React from "react";

import { Navbar, Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Contact" />
			<Navbar />
			<main className="w-full">
				<section className="h-screen bg-gradient-to-b from-primary-100 to-white"></section>
			</main>
		</>
	);
};

export default Page;
