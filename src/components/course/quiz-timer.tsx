import { RiTimeLine } from "@remixicon/react";
import * as React from "react";

type QuizTimerProps = {
	time: string;
	startTimer: () => NodeJS.Timeout;
};

// const convertToSeconds = ({ hour, minute }: { hour: number; minute: number }) => {
// 	return hour * 3600 + minute * 60;
// };

export const QuizTimer = ({ time, startTimer }: QuizTimerProps) => {
	const remainingTimeFiveMin =
		Number.parseInt(time.split(":")[1]) < 5 && Number.parseInt(time.split(":")[0]) === 0;

	React.useEffect(() => {
		const interval = startTimer();

		return () => clearInterval(interval);
	}, [startTimer]);

	return (
		<div className="flex items-center gap-1">
			<RiTimeLine size={20} />

			<p
				className={`text-sm font-bold ${remainingTimeFiveMin ? "text-[#DF1C41]" : "text-neutral-700"}`}>
				{time}
			</p>
		</div>
	);
};
