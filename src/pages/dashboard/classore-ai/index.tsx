import { AILayout } from "@/components/layouts/ai";
import { Seo } from "@/components/shared";
import Image from "next/image";
import classoreai from "@/assets/illustrations/classore-ai.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
	return (
		<>
			<Seo title="Classore AI" />
			<AILayout>
				<div className="flex h-screen w-full flex-col items-center justify-center">
					<Image src={classoreai} alt="classoreai" width="52" height="52" />
					<div className="mb-5 mt-8 text-center">
						<h3 className="text-2xl font-medium text-neutral-500">👋 Hi John..</h3>
						<h1 className="mt-2 text-[32px] font-medium leading-tight tracking-tight text-neutral-900">
							Are you ready to <br /> train your AI ?
						</h1>
					</div>
					<Button className="!bg-pr max-w-[103px] text-white" variant="default">
						<Link href="/dashboard/classore-ai/train">Let’s go</Link>
					</Button>
				</div>
			</AILayout>
		</>
	);
};
export default Page;
