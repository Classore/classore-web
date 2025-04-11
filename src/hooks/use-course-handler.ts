import { useCallback, useMemo, useState } from "react";

import type { ChapterModuleProps, ChapterResp } from "@/types";

interface UseCourseProps {
	chapters: ChapterResp[];
	courseId: string;
	modules: ChapterModuleProps[];
	onProgressUpdate?: () => void;
}

interface UseCourseHandler {
	canProceed: (moduleId: string) => boolean;
	chapterId: string;
	currentChapter: ChapterResp | null;
	currentModule: ChapterModuleProps | null;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isQuizPassed: (moduleId: string) => boolean;
	moduleId: string;
	nextChapterId: string;
	nextModuleId: string;
	onNextChapter: () => void;
	onNextModule: () => void;
	onPreviousChapter: () => void;
	onPreviousModule: () => void;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModuleId: (moduleId: string) => void;
}

export const useCourseHandler = ({
	chapters,
	courseId,
	modules,
}: UseCourseProps): UseCourseHandler => {
	const [currentChapterId, setCurrentChapterId] = useState(chapters[0]?.id || "");
	const [currentModuleId, setCurrentModuleId] = useState(modules[0]?.id || "");

	const currentChapterIndex = useMemo(
		() => chapters.findIndex((chapter) => chapter?.id === currentChapterId),
		[chapters, currentChapterId]
	);

	const currentModuleIndex = useMemo(
		() => modules.findIndex((module) => module?.id === currentModuleId),
		[modules, currentModuleId]
	);

	const currentChapter = useMemo(
		() => (currentChapterIndex >= 0 ? chapters[currentChapterIndex] : null),
		[chapters, currentChapterIndex]
	);

	const currentModule = useMemo(
		() => (currentModuleIndex >= 0 ? modules[currentModuleIndex] : null),
		[modules, currentModuleIndex]
	);

	const canProceed = useCallback(
		(moduleId: string) => {
			const module = modules.find((module) => module?.id === moduleId);
			return module?.is_passed || false;
		},
		[modules]
	);

	const hasNextChapter = useMemo(
		() => currentChapterIndex < chapters.length - 1 && currentChapterIndex >= 0,
		[chapters.length, currentChapterIndex]
	);

	const hasPreviousChapter = useMemo(() => currentChapterIndex > 0, [currentChapterIndex]);

	const hasNextModule = useMemo(
		() => currentModuleIndex < modules.length - 1 && currentModuleIndex >= 0,
		[modules.length, currentModuleIndex]
	);

	const hasPreviousModule = useMemo(() => currentModuleIndex > 0, [currentModuleIndex]);

	const nextChapterId = useMemo(
		() => (hasNextChapter ? chapters[currentChapterIndex + 1]?.id : ""),
		[chapters, currentChapterIndex, hasNextChapter]
	);

	const nextModuleId = useMemo(
		() => (hasNextModule ? modules[currentModuleIndex + 1]?.id : ""),
		[modules, currentModuleIndex, hasNextModule]
	);

	const isQuizPassed = useCallback(
		(moduleId: string) => {
			const module = modules.find((module) => module?.id === moduleId);
			return module?.is_passed || false;
		},
		[modules]
	);

	const updateProgress = useCallback(
		(newChapterId?: string, newModuleId?: string) => {
			if (newChapterId) {
				setCurrentChapterId(newChapterId);
			}
			if (newModuleId) {
				setCurrentModuleId(newModuleId);
			}
		},
		[courseId]
	);

	const onNextChapter = useCallback(async () => {
		if (!hasNextChapter) return;

		const nextChapter = chapters[currentChapterIndex + 1];
		const firstModuleId = nextChapter.modules[0]?.id;

		if (!firstModuleId) return;

		await updateProgress(nextChapter.id, firstModuleId);
	}, [chapters, currentChapterIndex, hasNextChapter, updateProgress]);

	const onPreviousChapter = useCallback(async () => {
		if (!hasPreviousChapter) return;

		const previousChapter = chapters[currentChapterIndex - 1];
		const firstModuleId = previousChapter.modules[0]?.id;

		if (!firstModuleId) return;

		await updateProgress(previousChapter.id, firstModuleId);
	}, [chapters, currentChapterIndex, hasPreviousChapter, updateProgress]);

	const onNextModule = useCallback(async () => {
		if (!hasNextModule) return;

		const nextModule = modules[currentModuleIndex + 1];
		if (!nextModule?.id) return;

		await updateProgress(undefined, nextModule.id);
	}, [currentModuleIndex, hasNextModule, modules, updateProgress]);

	const onPreviousModule = useCallback(async () => {
		if (!hasPreviousModule) return;

		const previousModule = modules[currentModuleIndex - 1];
		if (!previousModule?.id) return;

		await updateProgress(undefined, previousModule.id);
	}, [currentModuleIndex, hasPreviousModule, modules, updateProgress]);

	return {
		canProceed,
		chapterId: currentChapterId,
		currentChapter,
		currentModule,
		hasNextChapter,
		hasNextModule,
		hasPreviousChapter,
		hasPreviousModule,
		isQuizPassed,
		moduleId: currentModuleId,
		nextChapterId,
		nextModuleId,
		onNextChapter,
		onNextModule,
		onPreviousChapter,
		onPreviousModule,
		setCurrentChapterId,
		setCurrentModuleId,
	};
};
