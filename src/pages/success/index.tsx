import { useMutation } from "@tanstack/react-query";
import { RiLoader2Line } from "@remixicon/react";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import { type PaymentCallbackDto, paymentCallback } from "@/queries/school";
import { Button } from "@/components/ui/button";
import type { HttpError } from "@/types";
import { useWindowSize } from "@/hooks";

const Page = () => {
	const [isVerified, setIsVerified] = React.useState(false);
	const { height, width } = useWindowSize();
	const router = useRouter();
	const reference = router.query.reference as string;

	const { isPending, mutate } = useMutation({
		mutationKey: ["payment-callback"],
		mutationFn: (data: PaymentCallbackDto) => paymentCallback(data),
		onSuccess: () => {
			toast.success("Payment verified successfully");
			setIsVerified(true);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response?.data.message)
				? error?.response.data.message[0]
				: error?.response.data.message;
			const message = errorMessage ?? "Something went wrong, please try again later";
			toast.error(message);
		},
	});

	React.useEffect(() => {
		if (reference) {
			mutate({
				event: "charge.success",
				data: {
					metadata: {
						narration_id: "",
						narration: "RESERVATION",
					},
					reference: reference,
				},
			});
		}
	}, [reference]);

	return (
		<div className="grid h-screen w-screen place-items-center">
			<ReactConfetti width={width} height={height} numberOfPieces={500} />
			<div className="flex flex-col items-center gap-y-5 text-center">
				<div className="relative h-[30px] w-[135px] px-6">
					<Image src="/assets/images/classore.png" alt="classore" fill sizes="(max-width:1024px)100%" />
				</div>
				{isVerified ? (
					isPending ? (
						<div className="flex flex-col items-center gap-y-5">
							<p className="text-lg font-medium">Verifying payment...</p>
							<RiLoader2Line className="text-primary animate-spin" />
						</div>
					) : (
						<div className="flex flex-col items-center gap-y-5">
							<p className="text-lg font-medium">
								Your payment was successful. You can now begin learning.
							</p>
							<Button asChild className="w-fit">
								<Link href="/signin">Proceed to login</Link>
							</Button>
						</div>
					)
				) : (
					<div className="flex flex-col items-center gap-y-5">
						<p className="text-lg font-medium">Please wait while we verify your payment</p>
						<RiLoader2Line className="text-primary animate-spin" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
