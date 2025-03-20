import { RiMicLine, RiPauseFill, RiRecordCircleLine, RiStopFill } from "@remixicon/react";
import React from "react";

import { AudioPlayer } from "./audio-player";

type AudioState = "idle" | "recording" | "recorded";

interface Props {
	audioFile: Blob | null;
	onStateChange: (state: AudioState) => void;
	onAudioChange: (audio: Blob) => void;
	state: AudioState;
	existingAudioUrl?: string; // Optional prop for existing audio
}

export const AudioRecorder = ({
	audioFile,
	onStateChange,
	onAudioChange,
	state,
	existingAudioUrl,
}: Props) => {
	const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
	const [audioURL, setAudioURL] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const audioChunks = React.useRef<Blob[]>([]);

	React.useEffect(() => {
		if (existingAudioUrl && !audioURL && state === "idle") {
			setAudioURL(existingAudioUrl);
			onStateChange("recorded");
		}
	}, [existingAudioUrl, audioURL, onStateChange, state]);

	React.useEffect(() => {
		return () => {
			if (audioURL && audioURL !== existingAudioUrl) {
				URL.revokeObjectURL(audioURL);
			}
		};
	}, [audioURL, existingAudioUrl]);

	React.useEffect(() => {
		if (audioFile && state === "recorded" && !audioURL) {
			const url = URL.createObjectURL(audioFile);
			setAudioURL(url);
			return () => {
				URL.revokeObjectURL(url);
			};
		}
	}, [audioFile, state, audioURL]);

	const startRecording = async () => {
		try {
			if (audioURL && audioURL !== existingAudioUrl) {
				URL.revokeObjectURL(audioURL);
				setAudioURL(null);
			}

			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorder = new MediaRecorder(stream);

			audioChunks.current = [];

			recorder.addEventListener("dataavailable", (event) => {
				audioChunks.current.push(event.data);
			});

			recorder.addEventListener("stop", () => {
				const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
				const url = URL.createObjectURL(audioBlob);

				if (audioURL && audioURL !== existingAudioUrl) {
					URL.revokeObjectURL(audioURL);
				}

				setAudioURL(url);
				onAudioChange(audioBlob);
				onStateChange("recorded");
			});

			recorder.start();
			setMediaRecorder(recorder);
			onStateChange("recording");
			setError(null);
		} catch (err) {
			setError("Could not access microphone. Please check permissions.");
			console.error("Error accessing media devices:", err);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") {
			mediaRecorder.stop();
			mediaRecorder.stream.getTracks().forEach((track) => track.stop());
			setMediaRecorder(null);
		}
	};

	const cancelRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") {
			mediaRecorder.stop();
			mediaRecorder.stream.getTracks().forEach((track) => track.stop());
		}

		setMediaRecorder(null);

		// If we have an existing audio URL, revert to it
		if (existingAudioUrl) {
			setAudioURL(existingAudioUrl);
			onStateChange("recorded");
		} else {
			if (audioURL) {
				URL.revokeObjectURL(audioURL);
				setAudioURL(null);
			}
			onStateChange("idle");
		}

		audioChunks.current = [];
	};

	const resetRecording = () => {
		onStateChange("idle");
		if (audioURL && audioURL !== existingAudioUrl) {
			URL.revokeObjectURL(audioURL);
			setAudioURL(null);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{error && <div className="rounded-md bg-red-50 p-2 text-sm text-red-500">{error}</div>}
			<div className="flex items-center gap-2">
				{state === "idle" && (
					<div className="flex w-full items-center gap-x-4">
						{existingAudioUrl && !audioURL && <AudioPlayer source={existingAudioUrl} allowReplay />}

						<button
							onClick={startRecording}
							title="record audio"
							className="flex h-8 items-center gap-x-2 rounded-md border bg-green-100 px-2 text-sm font-medium text-green-700">
							<RiRecordCircleLine className="size-4" />
							{existingAudioUrl ? "Record New" : "Record Audio"}
						</button>
					</div>
				)}
				{state === "recording" && (
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-x-2">
							<RiMicLine className="size-4 animate-pulse text-red-400" />
							<span className="text-sm text-gray-600">Recording...</span>
						</div>

						<div className="flex items-center gap-x-4">
							<button
								onClick={stopRecording}
								className="flex h-8 items-center gap-x-2 rounded-md border bg-neutral-100 px-2 text-sm font-medium text-neutral-700">
								<RiPauseFill className="size-4" /> Pause
							</button>

							<button
								onClick={cancelRecording}
								className="flex h-8 items-center gap-x-2 rounded-md border bg-red-100 px-2 text-sm font-medium text-red-700">
								<RiStopFill className="size-4" /> Stop
							</button>
						</div>
					</div>
				)}
				{state === "recorded" && audioURL && (
					<div className="flex w-full items-center justify-between gap-x-4">
						<AudioPlayer source={audioURL} allowReplay />
						<button
							onClick={resetRecording}
							className="flex h-8 items-center gap-x-2 rounded-md border bg-green-100 px-2 text-sm font-medium text-green-700">
							<RiRecordCircleLine className="size-4" /> Record New
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
