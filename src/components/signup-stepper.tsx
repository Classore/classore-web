import { classore } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type SignupStepper = {
	step: number;
};

const steps = [1, 2, 3, 4];

export const SignupStepper = () => {
	const router = useRouter();

	const step = Number(router.query.step) ?? 1;

	return (
		<div className="flex items-center justify-between gap-2">
			<div className="hidden items-center gap-1 lg:flex">
				{steps.map((item) => (
					<span
						data-active={item <= step ? "true" : "false"}
						className="inline-block h-[2px] w-8 bg-neutral-300 data-[active=true]:bg-primary-300"
						key={item}
					/>
				))}
			</div>

			<Link href="/" className="w-fit lg:hidden">
				<Image src={classore} alt="classore" width={120} height={25} />
			</Link>

			<p className="text-sm tracking-tight text-neutral-500">STEP {router.query.step ?? 1} of 4</p>
		</div>
	);
};
