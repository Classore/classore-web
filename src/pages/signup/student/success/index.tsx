import { SuccessGraphic } from "@/assets/icons";
import { classore } from "@/assets/images";
import { AuthLayout } from "@/components/layouts/auth";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Confetti } from "@neoconfetti/react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

const isUuid = (val?: string) =>
	Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val.trim()));

const getBundleTitle = (name?: string) => {
	if (!name || isUuid(name)) return "JAMB Exam Prep Bundle";
	const trimmed = name.trim();
	if (/exam prep bundle$/i.test(trimmed)) return trimmed;
	if (/bundle$/i.test(trimmed)) return `${trimmed.replace(/bundle$/i, "").trim()} Exam Prep Bundle`;
	return `${trimmed} Exam Prep Bundle`;
};

const Page = () => {
	const router = useRouter();
	const { bundle, bundle_name } = router.query;
	const rawName =
		(typeof bundle_name === "string" && bundle_name) ||
		(typeof bundle === "string" && bundle) ||
		"";
	const bundleTitle = getBundleTitle(rawName);

	return (
		<>
			<Seo title="Student Registration Success" />

			<AuthLayout screen="signup">
				<Confetti particleCount={500} />

				<div className="flex max-w-96 flex-col gap-6">
					<Link href="/" className="w-fit lg:hidden">
						<Image src={classore} alt="classore" width={120} height={25} />
					</Link>

					<div className="flex max-w-96 flex-col gap-6 pt-10 lg:pt-20">
						<SuccessGraphic />
						<h2 className="font-body text-2xl font-bold -tracking-wide text-neutral-900">Success 🎉</h2>

						<p className="font-heading text-sm text-neutral-500">
							Your payment for <strong className="text-neutral-900">“{bundleTitle}”</strong> was
							successful
						</p>

						<Button asChild>
							<Link href="/dashboard" replace>
								Go to Dashboard
							</Link>
						</Button>
					</div>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
