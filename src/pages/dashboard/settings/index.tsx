import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Settings" />
			<DashboardLayout>
				<h1>Settings</h1>
			</DashboardLayout>
		</>
	);
};

export default Page;
