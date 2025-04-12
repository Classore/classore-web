import { useCallback, useMemo, useState } from "react";

import type { ChapterModuleProps, ChapterResp } from "@/types";

interface UseCourseProps {
	chapters: ChapterResp[];
	courseId: string;
	modules: ChapterModuleProps[];
	onProgressUpdate?: (currentChapterId: string, currentModuleId: string) => Promise<void>;
}

interface UseCourseHandler {
	chapterList: ChapterResp[];
	canProceed: boolean;
	chapterId: string;
	currentChapter: ChapterResp | null;
	currentModule: ChapterModuleProps | null;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isQuizPassed: (moduleId: string) => boolean;
	moduleId: string;
	moduleList: ChapterModuleProps[];
	nextChapterId: string;
	nextModuleId: string;
	onNextChapter: () => void;
	onNextModule: () => void;
	onPreviousChapter: () => void;
	onPreviousModule: () => void;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModuleId: (moduleId: string) => void;
	resetModuleForChapter: (chapterId: string) => string; // New utility function
}

const getStoredProgress = (courseId: string) => {
	if (typeof window === "undefined") return null;
	try {
		const data = localStorage.getItem(`course_progress_${courseId}`);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return null;
	}
};

const storeProgress = (courseId: string, chapterId: string, moduleId: string) => {
	if (typeof window === "undefined") return;

	try {
		localStorage.setItem(`course_progress_${courseId}`, JSON.stringify({ chapterId, moduleId }));
	} catch (error) {
		console.error("Error writing to localStorage:", error);
	}
};

export const useCourseHandler = ({
	chapters,
	courseId,
	modules,
	onProgressUpdate,
}: UseCourseProps): UseCourseHandler => {
	const storedProgress = getStoredProgress(courseId);

	const validChapters = Array.isArray(chapters) ? chapters : [];

	const [currentChapterId, setInternalChapterId] = useState(() => {
		if (storedProgress?.chapterId && validChapters.some((ch) => ch.id === storedProgress.chapterId)) {
			return storedProgress.chapterId;
		}
		return validChapters[0]?.id || "";
	});

	const [currentModuleId, setInternalModuleId] = useState(() => {
		const relevantChapterId =
			storedProgress?.chapterId && validChapters.some((ch) => ch.id === storedProgress.chapterId)
				? storedProgress.chapterId
				: validChapters[0]?.id;

		const relevantChapter = validChapters.find((ch) => ch.id === relevantChapterId);
		const chapterModules = relevantChapter?.modules || modules || [];

		if (storedProgress?.moduleId && chapterModules.some((m) => m.id === storedProgress.moduleId)) {
			return storedProgress.moduleId;
		}

		return chapterModules[0]?.id || modules[0]?.id || "";
	});

	const resetModuleForChapter = useCallback(
		(chapterId: string): string => {
			const targetChapter = validChapters.find((ch) => ch.id === chapterId);
			const chapterModules = targetChapter?.modules || [];
			const firstModuleId = chapterModules[0]?.id || "";

			return firstModuleId;
		},
		[validChapters]
	);

	const setCurrentChapterId = useCallback(
		(chapterId: string) => {
			if (!chapterId) return;
			const targetChapter = validChapters.find((ch) => ch.id === chapterId);

			if (!targetChapter) {
				console.error(`Chapter with ID ${chapterId} not found`);
				return;
			}

			setInternalChapterId(chapterId);
			const firstModuleId = resetModuleForChapter(chapterId);

			if (firstModuleId) {
				setInternalModuleId(firstModuleId);
				storeProgress(courseId, chapterId, firstModuleId);
			} else {
				console.error(`No valid module found for chapter ${chapterId}`);
			}
		},
		[validChapters, courseId, resetModuleForChapter]
	);

	const setCurrentModuleId = useCallback(
		(moduleId: string) => {
			if (!moduleId) return;

			setInternalModuleId(moduleId);
			storeProgress(courseId, currentChapterId, moduleId);
		},
		[courseId, currentChapterId]
	);

	const chapterList = useMemo(() => validChapters, [validChapters]);
	const moduleList = useMemo(() => modules || [], [modules]);

	const currentChapter = useMemo(() => {
		return chapterList.find((chapter) => chapter.id === currentChapterId) || null;
	}, [chapterList, currentChapterId]);

	const currentModule = useMemo(() => {
		return moduleList.find((module) => module.id === currentModuleId) || null;
	}, [moduleList, currentModuleId]);

	const currentChapterIndex = useMemo(() => {
		return chapterList.findIndex((chapter) => chapter.id === currentChapterId);
	}, [chapterList, currentChapterId]);

	const currentModuleIndex = useMemo(() => {
		return moduleList.findIndex((module) => module.id === currentModuleId);
	}, [moduleList, currentModuleId]);

	const hasNextChapter = useMemo(() => {
		return currentChapterIndex < chapterList.length - 1 && currentChapterIndex !== -1;
	}, [currentChapterIndex, chapterList]);

	const hasPreviousChapter = useMemo(() => {
		return currentChapterIndex > 0;
	}, [currentChapterIndex]);

	const hasNextModule = useMemo(() => {
		return currentModuleIndex < moduleList.length - 1 && currentModuleIndex !== -1;
	}, [currentModuleIndex, moduleList]);

	const hasPreviousModule = useMemo(() => {
		return currentModuleIndex > 0;
	}, [currentModuleIndex]);

	const nextChapterId = useMemo(() => {
		if (!hasNextChapter) return "";
		return chapterList[currentChapterIndex + 1]?.id || "";
	}, [chapterList, currentChapterIndex, hasNextChapter]);

	const nextModuleId = useMemo(() => {
		if (!hasNextModule) return "";
		return moduleList[currentModuleIndex + 1]?.id || "";
	}, [moduleList, currentModuleIndex, hasNextModule]);

	const isQuizPassed = useCallback(
		(moduleId: string) => {
			const targetModule = moduleList.find((module) => module.id === moduleId);
			return !!targetModule?.is_passed;
		},
		[moduleList]
	);

	const canProceed = useMemo(() => {
		if (!currentModule) return false;
		return Boolean(currentModule.is_completed) || Boolean(currentModule.is_passed);
	}, [currentModule]);

	const onNextModule = useCallback(() => {
		if (!hasNextModule) return;

		const nextModule = moduleList[currentModuleIndex + 1];
		if (nextModule?.id) {
			setCurrentModuleId(nextModule.id);

			if (onProgressUpdate) {
				onProgressUpdate(currentChapterId, nextModule.id).catch((error) => {
					console.error("Error updating progress:", error);
				});
			}
		}
	}, [
		hasNextModule,
		moduleList,
		currentModuleIndex,
		currentChapterId,
		onProgressUpdate,
		setCurrentModuleId,
	]);

	const onPreviousModule = useCallback(() => {
		if (!hasPreviousModule) return;

		const prevModule = moduleList[currentModuleIndex - 1];
		if (prevModule?.id) {
			setCurrentModuleId(prevModule.id);

			if (onProgressUpdate) {
				onProgressUpdate(currentChapterId, prevModule.id).catch((error) => {
					console.error("Error updating progress:", error);
				});
			}
		}
	}, [
		hasPreviousModule,
		moduleList,
		currentModuleIndex,
		currentChapterId,
		onProgressUpdate,
		setCurrentModuleId,
	]);

	const onNextChapter = useCallback(() => {
		if (!hasNextChapter) return;

		const nextChapter = chapterList[currentChapterIndex + 1];
		if (!nextChapter) return;

		const nextChapterId = nextChapter.id;

		const nextChapterModules = nextChapter.modules || [];
		console.log({ nextChapterModules });
		const firstModuleId = nextChapterModules[0]?.id || "";

		if (firstModuleId) {
			setCurrentChapterId(nextChapterId);

			if (onProgressUpdate) {
				onProgressUpdate(nextChapterId, firstModuleId).catch((error) => {
					console.error("Error updating progress:", error);
				});
			}
		} else {
			console.error(`No modules found in next chapter ${nextChapterId}`);
		}
	}, [hasNextChapter, chapterList, currentChapterIndex, setCurrentChapterId, onProgressUpdate]);

	const onPreviousChapter = useCallback(() => {
		if (!hasPreviousChapter) return;

		const prevChapter = chapterList[currentChapterIndex - 1];
		if (!prevChapter) return;

		const prevChapterId = prevChapter.id;

		// Set to last module of the previous chapter
		const prevChapterModules = prevChapter.modules || [];

		if (prevChapterModules.length > 0) {
			const lastModuleIndex = prevChapterModules.length - 1;
			const lastModuleId = prevChapterModules[lastModuleIndex].id;

			// Set chapter first, which will trigger module update
			setCurrentChapterId(prevChapterId);

			// Explicitly set to last module (overriding default first module selection)
			if (lastModuleId) {
				setCurrentModuleId(lastModuleId);

				if (onProgressUpdate) {
					onProgressUpdate(prevChapterId, lastModuleId).catch((error) => {
						console.error("Error updating progress:", error);
					});
				}
			}
		} else {
			setCurrentChapterId(prevChapterId);
		}
	}, [
		hasPreviousChapter,
		chapterList,
		currentChapterIndex,
		setCurrentChapterId,
		setCurrentModuleId,
		onProgressUpdate,
	]);

	return {
		chapterList,
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
		moduleList,
		nextChapterId,
		nextModuleId,
		onNextChapter,
		onNextModule,
		onPreviousChapter,
		onPreviousModule,
		setCurrentChapterId,
		setCurrentModuleId,
		resetModuleForChapter,
	};
};
