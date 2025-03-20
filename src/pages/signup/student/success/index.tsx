import { SuccessGraphic } from "@/assets/icons";
import { classore } from "@/assets/images";
import { AuthLayout } from "@/components/layouts/auth";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Confetti } from "@neoconfetti/react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
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
							Your payment for <strong className="text-neutral-900">“JAMB Exam Prep Bundle”</strong> was
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
