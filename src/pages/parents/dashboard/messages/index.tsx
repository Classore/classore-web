import React from "react";

import { ParentDashboardLayout } from "@/components/layouts";

const Page = () => {
	return (
		<ParentDashboardLayout title="Messages">
			<div className="grid h-full w-full place-items-center">
				<div className="flex flex-col items-center gap-y-2">
					<h3 className="text-4xl font-semibold text-primary-400">Coming Soon</h3>
					<p>We&apos;re working on this module. Please check back later.</p>
				</div>
			</div>
		</ParentDashboardLayout>
	);
};

export default Page;
