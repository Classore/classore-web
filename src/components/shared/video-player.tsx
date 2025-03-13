/* eslint-disable react/display-name */
import { cn } from "@/lib";
import * as Slider from "@radix-ui/react-slider";
import {
  RiCollapseHorizontalLine,
  RiExpandWidthLine,
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
import { LoaderCircle } from "lucide-react";
import * as React from "react";

const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds)) return "0:00";

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

interface VideoPlayerProps {
  src: string;
  moduleProgress?: number;
  autoPlay?: boolean;
  className?: string;
  poster?: string;
  theatreMode?: boolean;
  setTheatreMode?: React.Dispatch<React.SetStateAction<boolean>>;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}

export const VideoPlayer = React.memo(
  ({
    src,
    autoPlay = false,
    className,
    poster,
    onReady,
    onError,
    setTheatreMode,
    theatreMode,
    // moduleProgress,
  }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showControls, setShowControls] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [wasPlayingBeforeSeeking, setWasPlayingBeforeSeeking] =
      React.useState(false);
    const [bufferProgress, setBufferProgress] = React.useState(0);

    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const hlsRef = React.useRef<Hls | null>(null);
    const playerRef = React.useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

    // Handle progress bar change
    const handleProgressChange = (newValue: number[]) => {
      if (!videoRef.current) return;

      const newTime = newValue[0];
      setCurrentTime(newTime);
      videoRef.current.currentTime = newTime;
      setProgress((newTime / duration) * 100);
    };

    // Handle progress bar seeking start
    const handleSeekStart = () => {
      setWasPlayingBeforeSeeking(isPlaying);

      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
      }
    };

    // Handle progress bar seeking end
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

    // TODO: Handle browser incompatibilities
    const toggleFullscreen = () => {
      if (!playerRef.current) return;

      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`,
          );
        });
      } else {
        document.exitFullscreen();
      }

      hideControlsTimer();
    };

    // Toggle Picture-in-Picture mode
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

      // Get the end time of the last buffered range
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const bufferPercentage = (bufferedEnd / duration) * 100;

      setBufferProgress(bufferPercentage);
    };

    const preventContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const toggleTheatreMode = () => {
      setTheatreMode?.((prev) => !prev);
    };

    // useEffect to handle video playing (hls or not) and errors
    React.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Function to handle media errors
      const handleMediaError = (error: unknown) => {
        console.error("Error playing media:", error);
        onError?.(error);
      };

      // Check if the source is an HLS stream or a regular video file
      const isHLSStream = src.includes(".m3u8");

      // Handle HLS streams
      if (isHLSStream) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            autoStartLoad: true,
          });

          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) {
              video.play().catch(handleMediaError);
            }
            onReady?.();
          });

          hls.on(Hls.Events.ERROR, (_event, data) => {
            console.error("HLS error:", data);
            onError?.(data);

            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.log(
                    "Fatal network error encountered, trying to recover",
                  );
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.log(
                    "Fatal media error encountered, trying to recover",
                  );
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
          // Native HLS support (Safari)
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
        // Handle regular video files (MP4, WebM, etc.)
        video.src = src;

        video.addEventListener("loadedmetadata", () => {
          onReady?.();
          if (autoPlay) {
            video.play().catch(handleMediaError);
          }
        });

        video.addEventListener("error", () => {
          const error = new Error(
            `Error loading video: ${video.error?.message || "Unknown error"}`,
          );
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

    // Video event handlers
    React.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);

      const onTimeUpdate = () => {
        // if (moduleProgress && !isLoading) {
        // 	const currentProgress = ((moduleProgress ?? 0) / 100) * (video.duration ?? 0)
        // 	console.log("module progress", moduleProgress)
        // 	console.log("current progress", currentProgress)
        // 	video.currentTime = currentProgress
        // }
        // console.log('currentTime', video.currentTime)
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100 || 0);
        updateBufferProgress();
      };
      const onLoadedMetadata = () => {
        setDuration(video.duration);
        setIsLoading(false);
      };
      const onEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        video.currentTime = 0;
      };

      // Buffer update events
      const onProgress = () => updateBufferProgress();

      const onWaiting = () => setIsLoading(true);
      const onPlaying = () => setIsLoading(false);

      // Fullscreen change handlers with vendor prefixes
      const onFullscreenChange = () => {
        setIsFullscreen(
          !!document.fullscreenElement ||
            // @ts-expect-error nil
            !!document.webkitFullscreenElement ||
            // @ts-expect-error nil
            !!document.mozFullScreenElement ||
            // @ts-expect-error nil
            !!document.msFullscreenElement,
        );
      };

      // Add event listeners
      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("ended", onEnded);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("playing", onPlaying);
      video.addEventListener("progress", onProgress);

      // Fullscreen change handlers with vendor prefixes
      document.addEventListener("fullscreenchange", onFullscreenChange);
      document.addEventListener("webkitfullscreenchange", onFullscreenChange);
      document.addEventListener("mozfullscreenchange", onFullscreenChange);
      document.addEventListener("MSFullscreenChange", onFullscreenChange);

      // Clean up event listeners
      return () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("progress", onProgress);

        // Remove fullscreen event listeners
        document.removeEventListener("fullscreenchange", onFullscreenChange);
        document.removeEventListener(
          "webkitfullscreenchange",
          onFullscreenChange,
        );
        document.removeEventListener("mozfullscreenchange", onFullscreenChange);
        document.removeEventListener("MSFullscreenChange", onFullscreenChange);

        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }, [updateBufferProgress]);

    // Auto-hide controls when playing
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

    // Handle keyboard shortcuts
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Only handle shortcuts if the player is in focus
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
          case "t":
            e.preventDefault();
            toggleTheatreMode();
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

    return (
      <div
        ref={playerRef}
        tabIndex={0}
        onMouseEnter={() => setShowControls(true)}
        className={cn(
          "h-72 md:h-full relative w-full overflow-hidden rounded-lg bg-neutral-900",
          className,
        )}
      >
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
          className="h-full w-full max-w-full rounded-lg object-cover"
        />

        {/* Buffering indicator */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-30">
            <LoaderCircle className="animate-spin text-white" size={64} />
          </div>
        ) : null}

        {/* Buffering indicator */}
        {!isLoading && !isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button onClick={togglePlay}>
              <RiPlayCircleFill className="text-white" size={48} />
            </button>
          </div>
        ) : null}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-2 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="relative">
            {/* progress bar */}
            <Slider.Root
              className="relative flex h-5 w-full touch-none select-none items-center"
              value={[currentTime]}
              max={duration || 100}
              step={0.01}
              onValueChange={handleProgressChange}
              onPointerDown={handleSeekStart}
              onPointerUp={handleSeekEnd}
            >
              <Slider.Track className="relative h-1 w-full grow rounded-full bg-white/30">
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
            <div className="absolute pointer-events-none top-1/2 left-0 w-full h-1 -translate-y-1/2 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/30"
                style={{ width: `${bufferProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Time and controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {/* Skip backward */}
                <button
                  className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full"
                  onClick={() => handleSkip(-10)}
                  aria-label="Skip backward 10 seconds"
                >
                  <RiReplay10Line size={16} />
                </button>

                {/* Play/Pause */}
                <button
                  className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <RiPauseLargeFill size={18} />
                  ) : (
                    <RiPlayLargeFill size={18} />
                  )}
                </button>

                {/* Skip forward */}
                <button
                  className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full"
                  onClick={() => handleSkip(10)}
                  aria-label="Skip forward 10 seconds"
                >
                  <RiForward10Line size={18} />
                </button>
              </div>

              <p className="text-xs font-semibold text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-white">
              <button
                title="Toggle mute (m)"
                onClick={toggleMute}
                className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full"
              >
                {isMuted ? (
                  <RiVolumeMuteLine size={16} />
                ) : (
                  <RiVolumeUpLine size={16} />
                )}
              </button>

              <button
                title="Toggle picture-in-picture mode (p)"
                onClick={togglePiPMode}
                className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full hidden md:block"
              >
                <RiPictureInPictureLine size={16} />
              </button>
              <button
                onClick={toggleTheatreMode}
                title="Toggle theatre mode (t)"
                className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full hidden lg:block"
              >
                {!theatreMode ? (
                  <RiExpandWidthLine size={16} />
                ) : (
                  <RiCollapseHorizontalLine size={16} />
                )}
              </button>
              <button
                title="Toggle fullscreen (f)"
                onClick={toggleFullscreen}
                className="text-white p-1.5 focus:bg-white/20 hover:bg-white/20 rounded-full"
              >
                {isFullscreen ? (
                  <RiFullscreenExitLine size={16} />
                ) : (
                  <RiFullscreenLine size={16} />
                )}
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
  },
);
