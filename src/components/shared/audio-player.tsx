import { RiPauseLine, RiPlayLine } from "@remixicon/react";
import dynamic from "next/dynamic";
import React from "react";

interface Props {
	source: string;
	allowReplay?: boolean;
}

const AudioPlayerClient = ({ source, allowReplay = false }: Props) => {
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [currentTime, setCurrentTime] = React.useState(0);
	const audioRef = React.useRef<HTMLAudioElement>(null);
	const [duration, setDuration] = React.useState(0);
	const [hasPlayed, setHasPlayed] = React.useState(false);

	React.useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.loop = false;

			const handleLoadedMetadata = () => {
				setDuration(audio.duration);
			};

			const handleTimeUpdate = () => {
				setCurrentTime(audio.currentTime);
			};

			const handleEnded = () => {
				audio.pause();
				audio.currentTime = 0;
				setCurrentTime(0);
				setIsPlaying(false);
				setHasPlayed(!allowReplay);
			};

			audio.addEventListener("loadedmetadata", handleLoadedMetadata);
			audio.addEventListener("timeupdate", handleTimeUpdate);
			audio.addEventListener("ended", handleEnded);

			return () => {
				audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
				audio.removeEventListener("timeupdate", handleTimeUpdate);
				audio.removeEventListener("ended", handleEnded);
			};
		}
	}, [source, allowReplay]);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else if (allowReplay || !hasPlayed) {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const formatTime = (time: number) => {
		if (isNaN(time)) return "0:00";
		if (time === Infinity) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
		if (allowReplay || !hasPlayed) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const percentage = (x / rect.width) * 100;
			const time = (percentage / 100) * duration;
			if (audioRef.current) {
				audioRef.current.currentTime = time;
				setCurrentTime(time);
			}
		}
	};

	const width = React.useMemo(() => {
		if (currentTime === 0 || duration === 0) return 0;
		return (currentTime / duration) * 100;
	}, [currentTime, duration]);

	const isDisabled = !allowReplay && hasPlayed;

	return (
		<div className="flex h-8 flex-1 items-center gap-x-2 rounded-lg border border-neutral-300 bg-white px-1">
			{source && <audio ref={audioRef} src={source} controls={false} />}
			<div className="flex flex-1 items-center space-x-4">
				<button
					onClick={togglePlay}
					disabled={isDisabled}
					className={`h-6 rounded-md ${isDisabled ? "bg-neutral-100 text-neutral-300" : "bg-primary-50 text-primary-400 hover:bg-primary-100"} px-3 transition-colors duration-200 focus:outline-none`}>
					{isPlaying ? <RiPauseLine className="size-4" /> : <RiPlayLine className="size-4" />}
				</button>
				<div className="flex flex-1 items-center space-x-4">
					<span className="w-12 text-sm text-neutral-400">{formatTime(currentTime)}</span>
					<div
						className={`relative h-1 flex-1 rounded-3xl bg-neutral-200 ${isDisabled ? "" : "cursor-pointer"}`}
						onClick={handleTimeChange}>
						<div
							style={{ width: `${width}%` }}
							className="h-full rounded-3xl bg-primary-400 transition-all duration-500"
						/>
						<div
							style={{ left: `${width}%` }}
							className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary-400 transition-all duration-500"></div>
					</div>
					<span className="w-12 text-sm text-neutral-400">{formatTime(duration)}</span>
				</div>
			</div>
		</div>
	);
};

export const AudioPlayer = dynamic<Props>(() => Promise.resolve(AudioPlayerClient), {
	ssr: false,
});
