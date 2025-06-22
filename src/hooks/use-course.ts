import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import { queryClient } from "@/providers";
import { updateModuleProgress } from "@/queries/user";
import type { ChapterModuleProps, ChapterResp, HttpError } from "@/types";

type UseCourseProps = {
	chapterId: string;
	chapters: ChapterResp[];
	courseId: string;
	moduleId: string;
	onProgressUpdate?: (currentChapterId: string, currentModuleId: string) => Promise<void>;
};

type UseCourseHandler = {
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
	nextModule: ChapterModuleProps | null;
	nextModuleId: string;
	onNext: () => void;
	onPrevious: () => void;
	previousChapterId: string;
	previousModule: ChapterModuleProps | null;
	previousModuleId: string;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModuleId: (moduleId: string) => void;
	previousChapter: ChapterResp | null;
};

interface UseCourseStorage {
	chapterId: string;
	moduleId: string;
}

const getStoredProgress = (courseId: string): UseCourseStorage | null => {
	if (typeof window === "undefined") return null;
	try {
		const data = localStorage.getItem(`course_progress_${courseId}`);
		if (!data) return null;
		const parsed = JSON.parse(data);
		if (typeof parsed !== "object" || !parsed.chapterId || !parsed.moduleId) {
			console.warn("Invalid stored course progress format, ignoring");
			return null;
		}
		return parsed;
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
	chapterId,
	chapters,
	courseId,
	moduleId,
	onProgressUpdate,
}: UseCourseProps): UseCourseHandler => {
	const storedProgress = React.useMemo(() => getStoredProgress(courseId), [courseId]);
	const validChapters = React.useMemo(() => {
		return Array.isArray(chapters) ? chapters : [];
	}, [chapters]);

	const initialChapterId = React.useMemo(() => {
		if (storedProgress?.chapterId && validChapters.some((ch) => ch.id === storedProgress.chapterId)) {
			return storedProgress.chapterId;
		}
		return validChapters[0]?.id || chapterId || "";
	}, [chapterId, storedProgress?.chapterId, validChapters]);

	const initialChapter = React.useMemo(
		() => validChapters.find((ch) => ch.id === initialChapterId) || validChapters[0] || null,
		[initialChapterId, validChapters]
	);

	const initialModules = React.useMemo(() => initialChapter?.modules || [], [initialChapter]);

	const initialModuleId = React.useMemo(() => {
		if (storedProgress?.moduleId && initialModules.some((m) => m.id === storedProgress.moduleId)) {
			return storedProgress.moduleId;
		}

		return initialModules[0]?.id || moduleId || "";
	}, [storedProgress?.moduleId, initialModules, moduleId]);

	const [currentChapterId, setInternalChapterId] = React.useState(initialChapterId);
	const [currentModuleId, setInternalModuleId] = React.useState(initialModuleId);

	const currentChapterIndex = React.useMemo(
		() => validChapters.findIndex((chapter) => chapter.id === currentChapterId),
		[validChapters, currentChapterId]
	);

	const currentChapter = React.useMemo(
		() => validChapters[currentChapterIndex] || null,
		[validChapters, currentChapterIndex]
	);

	const moduleList = React.useMemo(() => {
		const modules = currentChapter?.modules || [];
		return [...modules].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
	}, [currentChapter]);

	const currentModuleIndex = React.useMemo(
		() => moduleList.findIndex((module) => module.id === currentModuleId),
		[moduleList, currentModuleId]
	);

	const currentModule = React.useMemo(
		() => moduleList[currentModuleIndex] || null,
		[moduleList, currentModuleIndex]
	);

	React.useEffect(() => {
		if (moduleList.length > 0 && currentModuleIndex === -1) {
			const newModuleId = moduleList[0].id;
			if (newModuleId !== currentModuleId) {
				setInternalModuleId(newModuleId);
			}
		}
	}, [currentModuleId, moduleList, currentModuleIndex]);

	const hasNextModule = React.useMemo(
		() => currentModuleIndex >= 0 && currentModuleIndex < moduleList.length - 1,
		[currentModuleIndex, moduleList]
	);

	const hasNextChapter = React.useMemo(() => {
		return currentChapterIndex !== -1 && currentChapterIndex < validChapters.length - 1;
	}, [currentChapterIndex, validChapters]);

	const hasPreviousChapter = React.useMemo(() => {
		return currentChapterIndex > 0;
	}, [currentChapterIndex]);

	const hasPreviousModule = React.useMemo(() => {
		return currentModuleIndex > 0;
	}, [currentModuleIndex]);

	const nextChapterId = React.useMemo(() => {
		if (hasNextChapter) {
			return validChapters[currentChapterIndex + 1].id;
		}
		return "";
	}, [hasNextChapter, validChapters, currentChapterIndex]);

	const previousChapterId = React.useMemo(() => {
		if (hasPreviousChapter) {
			return validChapters[currentChapterIndex - 1].id;
		}
		return "";
	}, [hasPreviousChapter, validChapters, currentChapterIndex]);

	const previousChapter = React.useMemo(() => {
		if (hasPreviousChapter) {
			return validChapters[currentChapterIndex - 1];
		}
		return null;
	}, [hasPreviousChapter, validChapters, currentChapterIndex]);

	const nextModuleId = React.useMemo(() => {
		if (hasNextModule) {
			return moduleList[currentModuleIndex + 1].id;
		}
		if (hasNextChapter) {
			return validChapters[currentChapterIndex + 1]?.modules[0]?.id || "";
		}
		return "";
	}, [
		hasNextModule,
		hasNextChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
	]);

	const previousModuleId = React.useMemo(() => {
		if (hasPreviousModule) {
			return moduleList[currentModuleIndex - 1].id;
		}
		if (hasPreviousChapter) {
			const prevChapter = validChapters[currentChapterIndex - 1];
			const lastModuleIndex = prevChapter?.modules?.length - 1;
			return prevChapter?.modules[lastModuleIndex]?.id || "";
		}
		return "";
	}, [
		hasPreviousModule,
		hasPreviousChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
	]);

	// Module references
	const nextModule = React.useMemo(() => {
		if (hasNextModule) {
			return moduleList[currentModuleIndex + 1];
		}
		if (hasNextChapter) {
			return validChapters[currentChapterIndex + 1]?.modules[0] || null;
		}
		return null;
	}, [
		hasNextModule,
		hasNextChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
	]);

	const previousModule = React.useMemo(() => {
		if (hasPreviousModule) {
			return moduleList[currentModuleIndex - 1];
		}
		if (hasPreviousChapter) {
			const prevChapter = validChapters[currentChapterIndex - 1];
			const lastModuleIndex = prevChapter?.modules?.length - 1;
			return prevChapter?.modules[lastModuleIndex] || null;
		}
		return null;
	}, [
		hasPreviousModule,
		hasPreviousChapter,
		moduleList,
		currentModuleIndex,
		validChapters,
		currentChapterIndex,
	]);

	const canProceed = React.useMemo(() => {
		if (!currentModule) return false;
		return (
			Boolean(currentModule?.is_completed || (currentModule?.progress || 0) >= 50) &&
			Boolean(currentModule?.is_passed)
		);
	}, [currentModule]);

	const { mutate } = useMutation({
		mutationFn: updateModuleProgress,
		mutationKey: ["update-module-progress", courseId, currentChapterId, currentModuleId],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			queryClient.invalidateQueries({ queryKey: ["chapters"] });
			if (onProgressUpdate) {
				onProgressUpdate(currentChapterId, currentModuleId);
			}
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
	});

	const updateProgress = React.useCallback(
		(chapterId: string, moduleId: string) => {
			const currentStorage = getStoredProgress(courseId);
			if (
				currentStorage &&
				currentStorage.chapterId === chapterId &&
				currentStorage.moduleId === moduleId
			) {
				return;
			}

			storeProgress(courseId, { chapterId, moduleId });
			mutate({
				course_id: courseId,
				current_progress: 0,
				...(chapterId && { current_chapter_id: chapterId }),
				...(moduleId && { current_module_id: moduleId }),
			});

			if (onProgressUpdate) {
				onProgressUpdate(chapterId, moduleId).catch(() => {
					// console.error('Error updating progress:', error)
				});
			}
		},
		[courseId, mutate, onProgressUpdate]
	);

	const setCurrentChapterId = React.useCallback(
		(chapterId: string) => {
			if (chapterId === currentChapterId) {
				return;
			}
			const chapter = validChapters.find((ch) => ch.id === chapterId);
			if (chapter) {
				// NOTE: We could maybe deduce that the last module is the one that was watched
				const moduleId = chapter.modules[chapter.modules.length - 1].id || chapter.modules[0].id;

				// Update both states in a single batch
				React.startTransition(() => {
					setInternalChapterId(chapterId);
					if (moduleId) {
						setInternalModuleId(moduleId);
						updateProgress(chapterId, moduleId);
					}
				});
			}
		},
		[validChapters, updateProgress, currentChapterId]
	);

	// Force recalculation of module index when chapter changes
	React.useEffect(() => {
		const chapter = validChapters.find((ch) => ch.id === currentChapterId);
		if (chapter) {
			const moduleIndex = chapter.modules.findIndex((module) => module.id === currentModuleId);
			if (moduleIndex === -1 && chapter.modules.length > 0) {
				setInternalModuleId(chapter.modules[0].id);
			}
		}
	}, [currentChapterId, currentModuleId, validChapters]);

	const setCurrentModuleId = React.useCallback(
		(moduleId: string) => {
			if (moduleId === currentModuleId) {
				return;
			}

			if (currentChapter?.modules.some((m) => m.id === moduleId)) {
				setInternalModuleId(moduleId);
				updateProgress(currentChapterId, moduleId);
				// router.replace({
				// 	pathname: '/dashboard/my-courses/course/[id]',
				// 	params: {
				// 		id: courseId,
				// 	},
				// })
			}
		},
		[currentChapter, currentChapterId, updateProgress, currentModuleId]
	);

	const onNext = React.useCallback(() => {
		if (!currentChapter) return;

		if (hasNextModule) {
			const nextModule = moduleList[currentModuleIndex + 1];
			setInternalModuleId(nextModule?.id);
			updateProgress(currentChapterId, nextModule?.id);
			return;
		}

		if (hasNextChapter) {
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

	const calculateCurrentChapterProgress = (chapter: ChapterResp | null): number => {
		if (!chapter?.modules?.length) return 0;
		let totalProgress = 0;
		const moduleCount = chapter.modules.length;
		for (let i = 0; i < moduleCount; i++) {
			totalProgress += chapter.modules[i].progress || 0;
			if (totalProgress >= moduleCount * 100) {
				return 100;
			}
		}
		return Math.round(totalProgress / moduleCount);
	};

	const currentChapterProgress = React.useMemo(
		() => calculateCurrentChapterProgress(currentChapter),
		[currentChapter]
	);

	const currentModuleProgress = React.useMemo(() => {
		if (!currentModule) return 0;
		return currentModule?.progress || 0;
	}, [currentModule]);

	const isQuizPassed = React.useMemo(() => {
		if (!currentModule) return false;
		return currentModule?.is_passed || false;
	}, [currentModule]);

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
		nextModule,
		nextModuleId,
		onNext,
		onPrevious,
		previousChapterId,
		previousModule,
		previousModuleId,
		setCurrentChapterId,
		setCurrentModuleId,
		previousChapter,
	};
};