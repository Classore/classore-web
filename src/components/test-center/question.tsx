import React from "react";
// import { toast } from "sonner";
import {
  // RiImageAddLine,
  // RiLoaderLine,
  RiQuestionLine,
  // RiMicLine,
  // RiHeadphoneLine,
} from "@remixicon/react";

interface Props {
  question: unknown;
  sectionId: string;
  sequence: number;
}

// type AudioState = "idle" | "recording" | "recorded";

export const QuestionCard = ({ sequence }: Props) => {
  // const [recordingState, setRecordingState] =
  //   React.useState<AudioState>("idle");
  // const [mediaType, setMediaType] = React.useState<"audio" | "image">("audio");
  // const [, setAudioPreview] = React.useState<string | null>(null);
  // const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  // const audioChunksRef = React.useRef<Blob[]>([]);

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorderRef.current = mediaRecorder;
  //     audioChunksRef.current = [];

  //     mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         audioChunksRef.current.push(event.data);
  //       }
  //     };

  //     mediaRecorder.onstop = () => {
  //       const audioBlob = new Blob(audioChunksRef.current, {
  //         type: "audio/mpeg",
  //       });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       setAudioPreview(audioUrl);
  //       const audioFile = new File([audioBlob], "sample-audio.mp3", {
  //         type: "audio/mpeg",
  //       });
  //       console.log(audioFile);
  //     };

  //     mediaRecorder.start();
  //     setRecordingState("recording");
  //   } catch (error) {
  //     toast.error("Error accessing microphone. Please check permissions.");
  //     console.error("Error accessing microphone:", error);
  //   }
  // };

  // const stopRecording = () => {
  //   if (
  //     mediaRecorderRef.current &&
  //     mediaRecorderRef.current.state !== "inactive"
  //   ) {
  //     mediaRecorderRef.current.stop();
  //     setRecordingState("recorded");
  //     mediaRecorderRef.current.stream
  //       .getTracks()
  //       .forEach((track) => track.stop());
  //   }
  // };

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex h-7 w-full items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          <RiQuestionLine className="size-5 text-neutral-400" />
          <p className="text-xs text-neutral-400">QUESTION {sequence + 1}</p>
        </div>
        <div className="flex items-center gap-x-2"></div>
      </div>
    </div>
  );
};
