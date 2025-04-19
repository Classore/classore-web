/* eslint-disable react/display-name */
import { useMutation } from "@tanstack/react-query";
import * as Slider from "@radix-ui/react-slider";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import {
	RiForward10Line,
	RiFullscreenExitLine,
	RiFullscreenLine,
	RiPauseLargeFill,
	RiPictureInPictureLine,
	RiPlayCircleFill,
	RiPlayLargeFill,
	RiReplay10Line,
	RiVolumeMuteLine,
	RiVolumeUpLine,
} from "@remixicon/react";
import Hls from "hls.js";

import { updateModuleProgress } from "@/queries/user";
import { cn } from "@/lib";

const formatTime = (timeInSeconds: number): string => {
	if (isNaN(timeInSeconds)) return "0:00";

	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

interface VideoPlayerProps {
	courseId: string;
	moduleId: string;
	src: string;
	autoPlay?: boolean;
	className?: string;
	moduleProgress?: number;
	onError?: (error: unknown) => void;
	onReady?: () => void;
	poster?: string;
}

export const VideoPlayer = React.memo(
	({
		courseId,
		moduleId,
		src,
		autoPlay = false,
		className,
		poster,
		onReady,
		onError,
		moduleProgress,
	}: VideoPlayerProps) => {
		const [isPlaying, setIsPlaying] = React.useState(false);
		const [progress, setProgress] = React.useState(0);
		const [duration, setDuration] = React.useState(0);
		const [currentTime, setCurrentTime] = React.useState(0);
		const [isMuted, setIsMuted] = React.useState(false);
		const [isFullscreen, setIsFullscreen] = React.useState(false);
		const [showControls, setShowControls] = React.useState(true);
		const [isLoading, setIsLoading] = React.useState(false);
		const [wasPlayingBeforeSeeking, setWasPlayingBeforeSeeking] = React.useState(false);
		const [bufferProgress, setBufferProgress] = React.useState(0);
		const [loadingHls, setLoadingHls] = React.useState(false);

		const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
		const videoRef = React.useRef<HTMLVideoElement | null>(null);
		const playerRef = React.useRef<HTMLDivElement>(null);
		const hlsRef = React.useRef<Hls | null>(null);
		const lastSentProgressRef = React.useRef(0);

		const { mutate } = useMutation({
			mutationFn: updateModuleProgress,
			mutationKey: ["update-module-progress", courseId, moduleId, progress],
		});

		React.useEffect(() => {
			const updateProgress = () => {
				if (
					(Math.abs(Math.round(progress) - lastSentProgressRef.current) >= 1 &&
						progress <= 100 &&
						progress > lastSentProgressRef.current) ||
					(progress === 100 && lastSentProgressRef.current !== 100)
				) {
					const progressToSend = Math.min(Math.round(progress), 100);
					mutate({ course_id: courseId, module_id: moduleId, current_progress: progressToSend });
					lastSentProgressRef.current = progressToSend;
				}
			};
			updateProgress();
			const intervalId = lastSentProgressRef.current < 100 ? setInterval(updateProgress, 10000) : null;
			return () => {
				if (intervalId) clearInterval(intervalId);
			};
		}, [courseId, moduleId, progress, mutate]);

		const hideControlsTimer = React.useCallback(() => {
			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}

			setShowControls(true);

			if (isPlaying) {
				controlsTimeoutRef.current = setTimeout(() => {
					setShowControls(false);
				}, 3000);
			}
		}, [isPlaying]);

		const togglePlay = React.useCallback(() => {
			if (!videoRef.current) return;

			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}

			setIsPlaying(!isPlaying);
			hideControlsTimer();
		}, [hideControlsTimer, isPlaying]);

		const toggleMute = React.useCallback(() => {
			if (!videoRef.current) return;
			setIsMuted(!isMuted);
			videoRef.current.muted = !isMuted;

			hideControlsTimer();
		}, [hideControlsTimer, isMuted]);

		const handleProgressChange = (newValue: number[]) => {
			if (!videoRef.current) return;

			const newTime = newValue[0];
			const maxScrub = (progress * duration) / 100;
			if (newTime > maxScrub) return;
			setCurrentTime(newTime);
			videoRef.current.currentTime = newTime;
			setProgress((newTime / duration) * 100);
		};

		const handleSeekStart = () => {
			setWasPlayingBeforeSeeking(isPlaying);

			if (videoRef.current && isPlaying) {
				videoRef.current.pause();
			}
		};

		const handleSeekEnd = () => {
			if (videoRef.current && wasPlayingBeforeSeeking) {
				videoRef.current.play();
				setIsPlaying(true);
			}

			hideControlsTimer();
		};

		const handleSkip = (skipAmount: number) => {
			if (!videoRef.current) return;

			const newTime = Math.max(0, Math.min(duration, currentTime + skipAmount));
			videoRef.current.currentTime = newTime;

			hideControlsTimer();
		};

		const toggleFullscreen = () => {
			if (!playerRef.current) return;

			if (!document.fullscreenElement) {
				playerRef.current.requestFullscreen().catch((err) => {
					console.error(`Error attempting to enable fullscreen: ${err.message}`);
				});
			} else {
				document.exitFullscreen();
			}

			hideControlsTimer();
		};

		const togglePiPMode = async () => {
			try {
				if (!videoRef.current) return;

				if (document.pictureInPictureElement !== videoRef.current) {
					await videoRef.current.requestPictureInPicture();
				} else if (document.pictureInPictureElement === videoRef.current) {
					await document.exitPictureInPicture();
				}
			} catch (error) {
				console.error("Error toggling Picture-in-Picture mode: ", error);
			}

			hideControlsTimer();
		};

		const updateBufferProgress = () => {
			if (!videoRef.current || !duration) return;
			const video = videoRef.current;
			if (video.buffered.length === 0) return;
			const bufferedEnd = video.buffered.end(video.buffered.length - 1);
			const bufferPercentage = (bufferedEnd / duration) * 100;

			setBufferProgress(bufferPercentage);
		};

		const preventContextMenu = (e: React.MouseEvent) => {
			e.preventDefault();
			return false;
		};

		React.useEffect(() => {
			const video = videoRef.current;
			if (!video) return;
			const handleMediaError = (error: unknown) => {
				console.error("Error playing media:", error);
				onError?.(error);
			};
			const isHLSStream = src.includes(".m3u8");
			if (isHLSStream) {
				if (Hls.isSupported()) {
					setLoadingHls(true);
					const hls = new Hls({
						enableWorker: true,
						lowLatencyMode: true,
						autoStartLoad: true,
					});

					hlsRef.current = hls;
					hls.loadSource(src);
					hls.attachMedia(video);

					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						setLoadingHls(false);
						if (autoPlay) {
							video.play().catch(handleMediaError);
						}
						onReady?.();
					});

					hls.on(Hls.Events.ERROR, (_event, data) => {
						setLoadingHls(false);
						onError?.(data);

						if (data.fatal) {
							switch (data.type) {
								case Hls.ErrorTypes.NETWORK_ERROR:
									console.log("Fatal network error encountered, trying to recover");
									hls.startLoad();
									break;
								case Hls.ErrorTypes.MEDIA_ERROR:
									console.log("Fatal media error encountered, trying to recover");
									hls.recoverMediaError();
									break;
								default:
									console.log("Fatal error encountered, trying to recover");
									hls.recoverMediaError();
									break;
							}
						}
					});

					return () => {
						hlsRef.current = null;
						hls.destroy();
					};
				} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
					video.src = src;
					if (autoPlay) {
						video.play().catch(handleMediaError);
					}
					video.addEventListener("loadedmetadata", () => {
						onReady?.();
					});
					return;
				} else {
					const error = new Error("HLS is not supported in this browser");
					console.error(error);
					onError?.(error);
					return;
				}
			} else {
				video.src = src;
				video.addEventListener("loadedmetadata", () => {
					onReady?.();
					if (autoPlay) {
						video.play().catch(handleMediaError);
					}
				});

				video.addEventListener("error", () => {
					const error = new Error(`Error loading video: ${video.error?.message || "Unknown error"}`);
					console.error(error);
					onError?.(error);
				});
			}

			return () => {
				if (hlsRef.current) {
					hlsRef.current.destroy();
					hlsRef.current = null;
				}
				video.pause();
				video.src = "";
				video.load();
			};
		}, [autoPlay, onError, onReady, src]);

		React.useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			const onPlay = () => setIsPlaying(true);
			const onPause = () => setIsPlaying(false);

			const onTimeUpdate = () => {
				setCurrentTime(video.currentTime);
				setProgress((video.currentTime / video.duration) * 100 || 0);
				updateBufferProgress();
			};
			const onLoadedMetadata = () => {
				setDuration(video.duration);
				setIsLoading(false);
				const currentProgress =
					moduleProgress && moduleProgress !== 100
						? ((moduleProgress ?? 0) / 100) * (video.duration ?? 0)
						: 0;
				setProgress(currentProgress);
				video.currentTime = currentProgress;
			};
			const onEnded = () => {
				setIsPlaying(false);
				setProgress(0);
				setCurrentTime(0);
				video.currentTime = 0;
			};

			const onProgress = () => updateBufferProgress();
			const onWaiting = () => setIsLoading(true);
			const onPlaying = () => setIsLoading(false);

			const onFullscreenChange = () => {
				setIsFullscreen(
					!!document.fullscreenElement ||
						// @ts-expect-error nil
						!!document.webkitFullscreenElement ||
						// @ts-expect-error nil
						!!document.mozFullScreenElement ||
						// @ts-expect-error nil
						!!document.msFullscreenElement
				);
			};

			video.addEventListener("play", onPlay);
			video.addEventListener("pause", onPause);
			video.addEventListener("timeupdate", onTimeUpdate);
			video.addEventListener("loadedmetadata", onLoadedMetadata);
			video.addEventListener("ended", onEnded);
			video.addEventListener("waiting", onWaiting);
			video.addEventListener("playing", onPlaying);
			video.addEventListener("progress", onProgress);
			document.addEventListener("fullscreenchange", onFullscreenChange);
			document.addEventListener("webkitfullscreenchange", onFullscreenChange);
			document.addEventListener("mozfullscreenchange", onFullscreenChange);
			document.addEventListener("MSFullscreenChange", onFullscreenChange);

			return () => {
				video.removeEventListener("play", onPlay);
				video.removeEventListener("pause", onPause);
				video.removeEventListener("timeupdate", onTimeUpdate);
				video.removeEventListener("loadedmetadata", onLoadedMetadata);
				video.removeEventListener("ended", onEnded);
				video.removeEventListener("waiting", onWaiting);
				video.removeEventListener("playing", onPlaying);
				video.removeEventListener("progress", onProgress);
				document.removeEventListener("fullscreenchange", onFullscreenChange);
				document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
				document.removeEventListener("mozfullscreenchange", onFullscreenChange);
				document.removeEventListener("MSFullscreenChange", onFullscreenChange);

				if (controlsTimeoutRef.current) {
					clearTimeout(controlsTimeoutRef.current);
				}
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [moduleProgress]);

		React.useEffect(() => {
			if (isPlaying) {
				hideControlsTimer();
			} else {
				setShowControls(true);
				if (controlsTimeoutRef.current) {
					clearTimeout(controlsTimeoutRef.current);
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isPlaying]);

		React.useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (
					!playerRef.current?.contains(document.activeElement) &&
					document.activeElement !== document.body
				) {
					return;
				}

				switch (e.key.toLowerCase()) {
					case " ":
					case "k":
						e.preventDefault();
						togglePlay();
						break;
					case "f":
						e.preventDefault();
						toggleFullscreen();
						break;
					case "m":
						e.preventDefault();
						toggleMute();
						break;
					case "p":
						if (
							typeof document.exitPictureInPicture !== "undefined" &&
							typeof videoRef.current?.requestPictureInPicture !== "undefined"
						) {
							e.preventDefault();
							togglePiPMode();
						}
						break;
					case "arrowright":
						e.preventDefault();
						handleSkip(10);
						break;
					case "arrowleft":
						e.preventDefault();
						handleSkip(-10);
						break;
					default:
						break;
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isPlaying]);

		React.useEffect(() => {
			setProgress(0);
		}, [moduleId]);

		return (
			<div
				ref={playerRef}
				tabIndex={0}
				onMouseEnter={() => setShowControls(true)}
				className={cn(
					`relative aspect-[16/9] w-full overflow-hidden border bg-neutral-900 md:rounded-lg`,
					className
				)}>
				<video
					ref={videoRef}
					controls={false}
					width="100%"
					height="auto"
					onClick={togglePlay}
					onContextMenu={preventContextMenu}
					playsInline
					poster={poster}
					preload="metadata"
					controlsList="nodownload"
					className="size-full rounded-lg object-cover"
				/>

				{/* Buffering indicator */}
				{isLoading || loadingHls ? (
					<div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-30">
						<LoaderCircle className="animate-spin text-white" size={64} />
					</div>
				) : null}

				{/* Buffering indicator */}
				{!isLoading && !isPlaying ? (
					<div className="absolute inset-0 flex items-center justify-center bg-black/30">
						<button onClick={togglePlay}>
							<RiPlayCircleFill className="text-white" size={62} />
						</button>
					</div>
				) : null}

				{/* Controls */}
				<div
					className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-2 py-2.5 transition-opacity duration-300 md:px-4 ${
						showControls ? "opacity-100" : "pointer-events-none opacity-0"
					}`}>
					<div className="relative">
						{/* progress bar */}
						<Slider.Root
							className="relative flex h-5 w-full cursor-pointer touch-none select-none items-center"
							value={[currentTime]}
							max={duration || 100}
							step={0.01}
							onValueChange={handleProgressChange}
							onPointerDown={handleSeekStart}
							onPointerUp={handleSeekEnd}>
							<Slider.Track className="relative h-[3px] w-full grow rounded-full bg-white/30">
								<Slider.Range
									className="absolute h-full rounded-full bg-white"
									style={{ width: `${progress}%` }}
								/>
							</Slider.Track>
							<Slider.Thumb
								className="block h-4 w-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
								aria-label="Video progress"
							/>
						</Slider.Root>
						{/* Buffer progress indicator - positioned behind the playback progress bar */}
						<div className="pointer-events-none absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 overflow-hidden rounded-full">
							<div className="h-full bg-white/30" style={{ width: `${bufferProgress}%` }}></div>
						</div>
					</div>

					{/* Time and controls */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-0.5">
								{/* Skip backward */}
								<button
									className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20"
									onClick={() => handleSkip(-10)}
									aria-label="Skip backward 10 seconds">
									<RiReplay10Line size={16} />
								</button>

								{/* Play/Pause */}
								<button
									className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20"
									onClick={togglePlay}
									aria-label={isPlaying ? "Pause" : "Play"}>
									{isPlaying ? <RiPauseLargeFill size={24} /> : <RiPlayLargeFill size={24} />}
								</button>

								{/* Skip forward */}
								<button
									className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20"
									onClick={() => handleSkip(10)}
									aria-label="Skip forward 10 seconds">
									<RiForward10Line size={18} />
								</button>
							</div>

							<p className="text-xs font-semibold text-white">
								{formatTime(currentTime)} <span className="text-neutral-300">/ {formatTime(duration)}</span>
							</p>
						</div>

						<div className="flex items-center gap-2 text-white">
							<button
								title="Toggle mute (m)"
								onClick={toggleMute}
								className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20">
								{isMuted ? <RiVolumeMuteLine size={16} /> : <RiVolumeUpLine size={16} />}
							</button>

							<button
								title="Toggle picture-in-picture mode (p)"
								onClick={togglePiPMode}
								className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20">
								<RiPictureInPictureLine size={16} />
							</button>
							<button
								title="Toggle fullscreen (f)"
								onClick={toggleFullscreen}
								className="rounded-full p-1.5 text-white hover:bg-white/20 focus:bg-white/20">
								{isFullscreen ? <RiFullscreenExitLine size={16} /> : <RiFullscreenLine size={16} />}
							</button>
							{/* <button
								title='Open more video settings'
								className='text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full'>
								<RiSettings2Line size={16} />
							</button> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
);
