import { RiArticleLine } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";
import * as z from "zod";

import { useTestCenterStore, useUserStore } from "@/store/z-store";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { useGetSections } from "@/queries/test-center";
import type { TestCenterProps } from "@/types/test";
import { Select, SelectItem } from "../ui/select";
import { getTimeInSeconds } from "@/lib";
import { Button } from "../ui/button";
import { IconLabel } from "../shared";
import { steps } from "./data";

interface Props {
	test: TestCenterProps;
}

type Screen = "information" | "config" | "timer";

const schema = z.object({
	test_type: z.string().min(1, "Please select a test type"),
	subject: z.string().min(1, "Please select a subject"),
	timer_hour: z.number(),
	timer_minute: z.number(),
});

const TEST_TYPES = [
	{ label: "General Test", value: "general" },
	{ label: "Personal Test", value: "personal" },
];

type FormValues = z.infer<typeof schema>;

export const Information = ({ test }: Props) => {
	const [screen, setScreen] = React.useState<Screen>("information");
	const [timerInseconds, setTimerInSeconds] = React.useState(10);
	const [current, setCurrent] = React.useState(0);
	const { user } = useUserStore();
	const router = useRouter();

	const { setTimer } = useTestCenterStore();

	const { control, handleSubmit, watch } = useForm<FormValues>({
		defaultValues: {
			test_type: "",
			subject: "",
			timer_hour: 0,
			timer_minute: 0,
		},
	});

	const values = watch();

	React.useEffect(() => {
		if (screen === "timer") {
			const timer = setTimeout(() => {
				if (timerInseconds > 0) {
					setTimerInSeconds(timerInseconds - 1);
				} else {
					router.push(`/dashboard/test-center/take-exam?id=${values.subject}`);
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [screen, timerInseconds]);

	const handleNext = () => {
		if (current === steps.length - 1) {
			if (screen === "information") {
				setScreen("config");
			} else if (screen === "config") {
				if (!values.test_type) {
					toast.error("Please select a test type");
					return;
				}
				if (!values.subject) {
					toast.error("Please select a subject");
					return;
				}
				if (values.test_type === "personal" && !values.timer_hour && !values.timer_minute) {
					toast.error("Please set a timer");
					return;
				}
				setScreen("timer");
			} else {
				router.push(`/dashboard/test-center/take-exam?id=${values.subject}`);
			}
		} else {
			setCurrent(current + 1);
		}
	};

	const handlePrev = () => {
		if (screen === "timer") {
			setScreen("config");
		} else if (screen === "config") {
			setScreen("information");
		} else {
			if (current > 0) {
				setCurrent(current - 1);
			}
		}
	};

	const { data } = useGetSections(test.id);

	const onSubmit = () => {
		const timer = getTimeInSeconds(values.timer_hour, values.timer_minute);
		setTimer(timer);
	};

	return (
		<div className="w-full space-y-4">
			<div className="mt-8 space-y-2">
				<IconLabel icon={RiArticleLine} />
				<DialogTitle className="text-xl capitalize">Hi {user?.first_name} 👋</DialogTitle>
				<DialogDescription className="text-sm">
					Get ready to take your {test.title.toUpperCase()} exam with confidence
				</DialogDescription>
			</div>
			{screen === "information" && (
				<>
					<div className="w-full space-y-2 px-4 py-3.5">
						<p className="text-xs text-neutral-400">STEP {current + 1} of 3</p>
						<p className="text-sm font-medium text-neutral-500">{steps[current].label}</p>
						<ul className="list-disc">
							<li className="list-item text-xs text-neutral-400">{steps[current].description}</li>
						</ul>
					</div>
				</>
			)}
			{screen === "config" && (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Select label="Select Test Type" control={control} name="test_type">
						{TEST_TYPES.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</Select>
					<Select label="Select Subject" control={control} name="subject">
						{data?.test_sections.map((section) => (
							<SelectItem key={section.id} value={section.id}>
								{section.title}
							</SelectItem>
						))}
					</Select>
					{values.test_type === "personal" && values.subject && (
						<div className="w-full space-y-0.5">
							<label htmlFor="" className="text-sm font-medium text-neutral-300">
								Set Timer
							</label>
							<div className="grid w-full grid-cols-2">
								<Select control={control} name="timer_hour" className="rounded-r-none">
									{[...Array(5)].map((_, index) => (
										<SelectItem key={index} value={index.toString()}>
											{index} {index > 1 ? "hrs" : "hr"}
										</SelectItem>
									))}
								</Select>
								<Select control={control} name="timer_minute" className="rounded-l-none">
									{[...Array(12)].map((_, index) => (
										<SelectItem key={index} value={(index * 5).toString()}>
											{index * 5} mins
										</SelectItem>
									))}
								</Select>
							</div>
						</div>
					)}
				</form>
			)}
			{screen === "timer" && (
				<div className="space-y-4 rounded-lg bg-neutral-200 p-4">
					<p className="text-xs text-neutral-400">Test starts in:</p>
					<div className="flex w-full items-baseline justify-center gap-x-4">
						<h2 className="text-8xl font-extrabold transition-all ease-in-out">{timerInseconds}</h2>
						<p className="text-sm">Seconds</p>
					</div>
				</div>
			)}
			<hr className="w-full bg-neutral-300"></hr>
			<div className="flex w-full items-center justify-end gap-x-4">
				<Button
					onClick={handlePrev}
					hidden={screen === "timer"}
					className="w-fit text-sm font-light md:text-sm"
					disabled={screen === "timer"}
					size="sm"
					variant="outline">
					{screen === "information" && current === 0 ? "Cancel" : "Prev"}
				</Button>
				<Button onClick={handleNext} className="w-fit text-sm font-light md:text-sm" size="sm">
					{screen === "information" ? "Next" : "Start Test"}
				</Button>
			</div>
		</div>
	);
};
