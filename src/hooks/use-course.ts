import React from "react";
import type { ChapterModuleProps, ChapterResp } from "@/types";

interface UseCourseProps {
	chapters: ChapterResp[];
	courseId: string;
	onProgressUpdate?: (currentChapterId: string, currentModuleId: string) => Promise<void>;
}

interface UseCourseHandler {
	chapterList: ChapterResp[];
	canProceed: boolean;
	chapterId: string;
	courseProgress: number;
	currentChapter: ChapterResp | null;
	currentChapterProgress: number;
	currentModule: ChapterModuleProps | null;
	currentModuleProgress: number;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isQuizPassed: boolean;
	moduleId: string;
	moduleList: ChapterModuleProps[];
	nextChapterId: string;
	nextModuleId: string;
	onNext: () => void;
	onPrevious: () => void;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModuleId: (moduleId: string) => void;
}

interface UseCourseStorage {
	chapterId: string;
	moduleId: string;
}

const getStoredProgress = (courseId: string): UseCourseStorage | null => {
	if (typeof window === "undefined") return null;
	try {
		const data = localStorage.getItem(`course_progress_${courseId}`);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return null;
	}
};

const storeProgress = (courseId: string, payload: UseCourseStorage) => {
	if (typeof window === "undefined") return;

	try {
		localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(payload));
	} catch (error) {
		console.error("Error writing to localStorage:", error);
	}
};

export const useCourse = ({
	chapters,
	courseId,
	onProgressUpdate,
}: UseCourseProps): UseCourseHandler => {
	const storedProgress = React.useMemo(() => getStoredProgress(courseId), [courseId]);
	const validChapters = Array.isArray(chapters) ? chapters : [];

	const [currentChapterId, setInternalChapterId] = React.useState(() => {
		if (storedProgress?.chapterId && validChapters.some((ch) => ch.id === storedProgress.chapterId)) {
			return storedProgress.chapterId;
		}
		return validChapters[0]?.id || "";
	});

	const [currentModuleId, setInternalModuleId] = React.useState(() => {
		const relevantChapterId =
			storedProgress?.chapterId && validChapters.some((ch) => ch.id === storedProgress.chapterId)
				? storedProgress.chapterId
				: validChapters[0]?.id;
		const relevantChapter = validChapters.find((ch) => ch.id === relevantChapterId);
		const chapterModules = relevantChapter?.modules || [];

		if (storedProgress?.moduleId && chapterModules.some((m) => m.id === storedProgress.moduleId)) {
			return storedProgress.moduleId;
		}

		return chapterModules[0]?.id || "";
	});

	const currentChapterIndex = React.useMemo(
		() => validChapters.findIndex((chapter) => chapter.id === currentChapterId),
		[validChapters, currentChapterId]
	);

	const currentChapter = React.useMemo(
		() => validChapters[currentChapterIndex] || null,
		[validChapters, currentChapterIndex]
	);

	const moduleList = React.useMemo(() => currentChapter?.modules || [], [currentChapter]);

	const currentModuleIndex = React.useMemo(
		() => moduleList.findIndex((module) => module.id === currentModuleId),
		[moduleList, currentModuleId]
	);

	const currentModule = React.useMemo(
		() => moduleList[currentModuleIndex] || null,
		[moduleList, currentModuleIndex]
	);

	const hasNextChapter =
		currentChapterIndex !== -1 && currentChapterIndex < validChapters.length - 1;
	const hasPreviousChapter = currentChapterIndex > 0;
	const hasNextModule = currentModuleIndex !== -1 && currentModuleIndex < moduleList.length - 1;
	const hasPreviousModule = currentModuleIndex > 0;

	const nextChapterId = hasNextChapter ? validChapters[currentChapterIndex + 1].id : "";
	const nextModuleId = hasNextModule
		? moduleList[currentModuleIndex + 1].id
		: hasNextChapter
			? validChapters[currentChapterIndex + 1]?.modules[0]?.id || ""
			: "";

	const canProceed = React.useMemo(() => {
		if (!currentModule) return false;
		return (
			Boolean(currentModule?.is_completed || (currentModule?.progress || 0) >= 50) &&
			Boolean(currentModule?.is_passed)
		);
		return true;
	}, [currentModule]);

	const updateProgress = React.useCallback(
		(chapterId: string, moduleId: string) => {
			storeProgress(courseId, { chapterId, moduleId });
			if (onProgressUpdate) {
				onProgressUpdate(chapterId, moduleId).catch((error) => {
					console.error("Error updating progress:", error);
				});
			}
		},
		[courseId, onProgressUpdate]
	);

	const setCurrentChapterId = React.useCallback(
		(chapterId: string) => {
			const chapter = validChapters.find((ch) => ch.id === chapterId);
			if (chapter) {
				setInternalChapterId(chapterId);
				const moduleId = chapter.modules[0]?.id || "";
				if (moduleId) {
					setInternalModuleId(moduleId);
					updateProgress(chapterId, moduleId);
				}
			}
		},
		[validChapters, updateProgress]
	);

	const setCurrentModuleId = React.useCallback(
		(moduleId: string) => {
			if (currentChapter?.modules.some((m) => m.id === moduleId)) {
				setInternalModuleId(moduleId);
				updateProgress(currentChapterId, moduleId);
			}
		},
		[currentChapter, currentChapterId, updateProgress]
	);

	const onNext = React.useCallback(() => {
		if (!currentChapter) return;

		if (hasNextModule) {
			const nextModule = moduleList[currentModuleIndex + 1];
			setInternalModuleId(nextModule?.id);
			updateProgress(currentChapterId, nextModule?.id);
		} else if (hasNextChapter) {
			const nextChapter = validChapters[currentChapterIndex + 1];
			const firstModuleId = nextChapter?.modules[0]?.id || "";

			setInternalChapterId(nextChapter.id);
			setInternalModuleId(firstModuleId);
			updateProgress(nextChapter.id, firstModuleId);
		}
	}, [
		currentChapter,
		hasNextModule,
		hasNextChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
		currentChapterId,
		updateProgress,
	]);

	const onPrevious = React.useCallback(() => {
		if (!currentChapter) return;

		if (hasPreviousModule) {
			const prevModule = moduleList[currentModuleIndex - 1];
			setInternalModuleId(prevModule?.id);
			updateProgress(currentChapterId, prevModule?.id);
		} else if (hasPreviousChapter) {
			const prevChapter = validChapters[currentChapterIndex - 1];
			const lastModuleIndex = prevChapter?.modules?.length - 1;
			const lastModuleId = prevChapter?.modules[lastModuleIndex]?.id || "";

			setInternalChapterId(prevChapter.id);
			setInternalModuleId(lastModuleId);
			updateProgress(prevChapter.id, lastModuleId);
		}
	}, [
		currentChapter,
		hasPreviousModule,
		hasPreviousChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
		currentChapterId,
		updateProgress,
	]);

	const courseProgress = React.useMemo(() => {
		if (!validChapters.length) return 0;
		const cumulativeProgress = validChapters.reduce((acc, chapter) => {
			const chapterProgress = chapter.modules.reduce((moduleAcc, module) => {
				return moduleAcc + (module.progress || 0);
			}, 0);
			return acc + chapterProgress;
		}, 0);
		const totalModules = validChapters.reduce((acc, chapter) => {
			return acc + chapter.modules.length;
		}, 0);
		const overallProgress = (cumulativeProgress / (totalModules * 100)) * 100;
		return Math.min(Math.round(overallProgress), 100);
	}, [validChapters]);

	const currentChapterProgress = React.useMemo(() => {
		if (!currentChapter) return 0;
		const cumulativeProgress = currentChapter.modules.reduce((acc, module) => {
			const progress = module?.progress ?? 0;
			if (progress >= 50) {
				return acc + progress;
			}
			return acc;
		}, 0);
		return Math.min(cumulativeProgress, 100);
	}, [currentChapter]);

	const currentModuleProgress = React.useMemo(() => {
		if (!currentModule) return 0;
		return currentModule?.progress || 0;
	}, [currentModule]);

	const isQuizPassed = React.useMemo(() => {
		if (!currentModule) return false;
		return currentModule?.is_passed || false;
	}, []);

	return {
		chapterList: validChapters,
		canProceed,
		chapterId: currentChapterId,
		courseProgress,
		currentChapter,
		currentChapterProgress,
		currentModule,
		currentModuleProgress,
		hasNextChapter,
		hasNextModule,
		hasPreviousChapter,
		hasPreviousModule,
		isQuizPassed,
		moduleId: currentModuleId,
		moduleList,
		nextChapterId,
		nextModuleId,
		onNext,
		onPrevious,
		setCurrentChapterId,
		setCurrentModuleId,
	};
};
