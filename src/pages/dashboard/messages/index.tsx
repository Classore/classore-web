// import dynamic from "next/dynamic"

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

// const ChatComponent = dynamic(() => import("@/components/shared/chat-component"), {
// 	ssr: false,
// })

const Page = () => {
	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				{/* <ChatComponent user={user} initialOtherUserId={String(otherUserId)} /> */}
				<div className="grid h-full w-full place-items-center">
					<div className="flex flex-col items-center gap-y-2">
						<h3 className="text-4xl font-semibold text-primary-400">Coming Soon</h3>
						<p>We&apos;re working on this module. Please check back later.</p>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
