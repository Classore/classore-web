import { SuccessGraphic } from "@/assets/icons";
import { AuthLayout } from "@/components/layouts/auth";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
	return (
		<>
			<Seo title="Add Ward Success" />

			<AuthLayout screen="signup">
				{/* <Confetti particleCount={500} /> */}

				<div className="flex max-w-96 flex-col gap-6 pt-20">
					<SuccessGraphic />
					<h2 className="font-body text-2xl font-bold -tracking-wide text-neutral-900">
						Success 🎉
					</h2>

					<p className="text-balance font-heading text-sm text-neutral-500">
						You have successfully added your Ward(s). Monitor your ward’s progress with Classore
					</p>

					<Button asChild>
						<Link href="/dashboard" replace>
							Go to Dashboard
						</Link>
					</Button>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
