import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Test Center" />
			<DashboardLayout>
				<div className="flex h-full w-full p-8"></div>
			</DashboardLayout>
		</>
	);
};

export default Page;
