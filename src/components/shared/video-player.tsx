import {
	RiFullscreenExitLine,
	RiFullscreenLine,
	RiPauseLargeFill,
	RiPictureInPictureLine,
	RiPlayLargeFill,
	RiVolumeMuteLine,
	RiVolumeUpLine,
} from "@remixicon/react";
import { LoaderCircle } from "lucide-react";
import React from "react";

import { formatTime } from "@/lib";
import { updateModuleProgress } from "@/queries/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	src: string;
	moduleId?: string;
	moduleProgress: number | undefined;
}

export const VideoPlayer = ({ src, moduleId, moduleProgress }: Props) => {
	const queryClient = useQueryClient();
	const container = React.useRef<HTMLDivElement>(null)!;
	const video = React.useRef<HTMLVideoElement>(null)!;
	const scrub = React.useRef<HTMLDivElement>(null)!;
	const latestMutationRef = React.useRef<string | null>(null);

	const [showControls, setShowControls] = React.useState(false);
	const [isFullscreen, setIsFullscreen] = React.useState(false);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [currentTime, setCurrentTime] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isMuted, setIsMuted] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [duration, setDuration] = React.useState(0);
	const [isPip, setIsPip] = React.useState(false);
	const [isDragging, setIsDragging] = React.useState(false);

	React.useEffect(() => {
		if (moduleId && video.current) {
			video.current.currentTime = 0;
			setProgress(0);
			setIsPlaying(false);
		}
	}, [moduleId, video]);

	const togglePlay = () => {
		if (video.current) {
			if (isPlaying) {
				video.current.pause();
			} else {
				video.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const toggleMute = () => {
		if (video.current) {
			video.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const togglePictureInPicture = () => {
		if (video.current) {
			if (!isPip) {
				if (video.current.requestPictureInPicture) {
					video.current
						.requestPictureInPicture()
						.then(() => setIsPip(true))
						.catch((error) => console.error("Error entering Picture-in-Picture", error));
				}
			} else {
				if (document.exitPictureInPicture) {
					document
						.exitPictureInPicture()
						.then(() => setIsPip(false))
						.catch((error) => console.error("Error exiting Picture-in-Picture", error));
				}
			}
		}
	};

	const toggleFullscreen = () => {
		if (!video.current) return;

		const doc = document as Document & {
			mozCancelFullScreen?: () => Promise<void>;
			webkitExitFullscreen?: () => Promise<void>;
			msExitFullscreen?: () => Promise<void>;
		};

		const elem = video.current as HTMLVideoElement & {
			mozRequestFullScreen?: () => Promise<void>;
			webkitRequestFullscreen?: () => Promise<void>;
			msRequestFullscreen?: () => Promise<void>;
		};

		if (!isFullscreen) {
			const requestFS =
				elem.requestFullscreen ||
				elem.mozRequestFullScreen ||
				elem.webkitRequestFullscreen ||
				elem.msRequestFullscreen;

			requestFS?.call(elem);
		} else {
			const exitFS =
				doc.exitFullscreen ||
				doc.mozCancelFullScreen ||
				doc.webkitExitFullscreen ||
				doc.msExitFullscreen;

			exitFS?.call(doc);
		}

		setIsFullscreen(!isFullscreen);
	};

	const handleTimeUpdate = () => {
		if (video.current && !isDragging) {
			const currentProgress = (video.current.currentTime / video.current.duration) * 100;
			setProgress(currentProgress);
			setCurrentTime(video.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (video.current) {
			setDuration(video.current.duration);
			setIsLoading(false);
		}
	};

	const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (scrub.current && video.current) {
			const progressBar = scrub.current;
			const percent = e.nativeEvent.offsetX / progressBar.offsetWidth;
			video.current.currentTime = percent * video.current.duration;
			setProgress(percent * 100);
		}
	};

	const handleScrubStart = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		handleScrubDrag(e);
		document.addEventListener("mousemove", handleScrubDrag);
		document.addEventListener("mouseup", handleScrubEnd);
	};

	const handleScrubDrag = React.useCallback(
		(e: MouseEvent | React.MouseEvent) => {
			if (scrub.current && video.current && isDragging) {
				const rect = scrub.current.getBoundingClientRect();
				const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
				video.current.currentTime = percent * video.current.duration;
				setProgress(percent * 100);
				setCurrentTime(video.current.currentTime);
			}
		},
		[isDragging, scrub, video]
	);

	const handleScrubEnd = React.useCallback(() => {
		setIsDragging(false);
		document.removeEventListener("mousemove", handleScrubDrag);
		document.removeEventListener("mouseup", handleScrubEnd);
	}, [handleScrubDrag]);

	const preventContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		return false;
	};

	const handleMouseMove = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}

		controlsTimeoutRef.current = setTimeout(() => {
			setShowControls(false);
		}, 3000);
	};

	const controlsTimeoutRef = React.useRef<NodeJS.Timeout>();

	React.useEffect(() => {
		const videoElement = video.current;

		const preventDownload = (e: Event) => {
			e.preventDefault();
			return false;
		};

		if (videoElement) {
			videoElement.addEventListener("contextmenu", preventDownload);
			videoElement.addEventListener("dragstart", preventDownload);
		}

		return () => {
			if (videoElement) {
				videoElement.removeEventListener("contextmenu", preventDownload);
				videoElement.removeEventListener("dragstart", preventDownload);
			}
			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}
			document.removeEventListener("mousemove", handleScrubDrag);
			document.removeEventListener("mouseup", handleScrubEnd);
		};
	}, [handleScrubDrag, handleScrubEnd, video]);

	// FIXME: This is not smooth, but does the job
	React.useEffect(() => {
		if (video.current && !isLoading && moduleProgress) {
			const currentProgress = ((moduleProgress ?? 0) / 100) * (video.current?.duration ?? 0);
			video.current.currentTime = currentProgress;
			// video.current.NETWORK_LOADING
		}
	}, [video, isLoading, moduleProgress]);

	// *this should be refactored*
	useMutation({
		mutationFn: updateModuleProgress,
		onMutate: () => {
			// Generate a unique identifier for this mutation (e.g., timestamp)
			const mutationId = crypto.randomUUID();
			return { mutationId };
		},
		onSuccess: (_data, _variables, context) => {
			// only refetch the course and chapter when the mutation is the latest one
			if (context?.mutationId === latestMutationRef.current) {
				queryClient.invalidateQueries({ queryKey: ["course"] });
				queryClient.invalidateQueries({ queryKey: ["chapter"] });
			}
		},
	});

	// const handleUpdate = async () => {
	// 	if (!video.current) return;

	// 	// Generate a unique identifier for this mutation (e.g., timestamp)
	// 	const mutationId = crypto.randomUUID();
	// 	latestMutationRef.current = mutationId;

	// 	const percentage = Math.floor(
	// 		(video.current.currentTime / video.current.duration) * 100
	// 	);
	// 	// Call the mutation with the unique identifier as context
	// 	await mutation.mutateAsync({
	// 		course_id: "",
	// 		current_progress: percentage,
	// 		module_id: "",
	// 	});
	// };

	return (
		<div
			ref={container}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setShowControls(false)}
			className="relative grid h-max w-full place-items-center rounded-lg bg-black">
			<div onContextMenu={preventContextMenu} className="relative size-full rounded-lg">
				<video
					ref={video}
					src={src}
					className="h-full w-full rounded-lg object-cover"
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadedMetadata}
					onWaiting={() => setIsLoading(true)}
					onCanPlay={() => setIsLoading(false)}
				/>
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<LoaderCircle className="animate-spin text-white" size={64} />
					</div>
				)}
				{!isLoading && !isPlaying && (
					<button
						onClick={togglePlay}
						className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/50">
						<RiPlayLargeFill className="text-white" size={64} />
					</button>
				)}
				{(showControls || !isPlaying) && !isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/50">
						<button onClick={togglePlay} className="transition-transform hover:scale-110">
							{isPlaying ? (
								<RiPauseLargeFill className="text-white" size={64} />
							) : (
								<RiPlayLargeFill className="text-white" size={64} />
							)}
						</button>
					</div>
				)}
				<div className="absolute bottom-5 left-4 flex w-[calc(100%-32px)] flex-col gap-2">
					<div
						ref={scrub}
						onClick={handleScrubClick}
						onMouseDown={handleScrubStart}
						className="relative flex h-1 w-full cursor-pointer items-center rounded-2xl bg-neutral-200/75">
						<div
							style={{ left: `${progress}%` }}
							className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-white"></div>
						<div
							style={{ width: `${progress}%` }}
							className="h-full rounded-2xl bg-white"></div>
					</div>

					<div className="flex w-full items-center justify-between">
						<div className="text-xs text-white">
							{formatTime(currentTime)} / {formatTime(duration)}
						</div>
						<div className="flex items-center gap-3 text-white">
							<button onClick={toggleMute} className="transition-all duration-500">
								{isMuted ? <RiVolumeMuteLine size={20} /> : <RiVolumeUpLine size={20} />}
							</button>
							<button onClick={togglePictureInPicture} className="transition-all duration-500">
								<RiPictureInPictureLine size={20} />
							</button>
							<button onClick={toggleFullscreen} className="transition-all duration-500">
								{isFullscreen ? (
									<RiFullscreenExitLine size={20} />
								) : (
									<RiFullscreenLine size={20} />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
