// I created it here cos I don't think it fits into any of the folder you created. You can move it if you think it fits into one of them

type SignupStepper = {
	step: number
}

export const SignupStepper = () => {
	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-1">
				<span className="inline-block h-[2px] w-8 bg-primary-300" />
				<span className="inline-block h-[2px] w-8 bg-neutral-300" />
				<span className="inline-block h-[2px] w-8 bg-neutral-300" />
				<span className="inline-block h-[2px] w-8 bg-neutral-300" />
			</div>

			<p className="text-sm tracking-tight text-neutral-500">STEP 1 of 4</p>
		</div>
	)
}
