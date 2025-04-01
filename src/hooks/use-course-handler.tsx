import React from "react";

import type { ChapterModuleProps, ChapterResp, SingleCourseResp } from "@/types";
import { useGetChapter } from "@/queries/student";

export interface UseCourseProps {
	course: SingleCourseResp | undefined;
	chapterId: string;
	moduleId: string;
}

export interface UseCourseHandler {
	canProceed: boolean;
	currentChapter: ChapterResp | undefined;
	currentModule: ChapterModuleProps | undefined;
	hasNextModule: boolean;
	hasPreviousModule: boolean;
	isFirstChapter: boolean;
	isLastChapter: boolean;
	isLastModule: boolean;
	isQuizPassed: boolean;
	onNextModule: () => void;
	onPreviousModule: () => void;
}

interface CurrentState {
	chapterId: string;
	moduleId: string;
}

export const useCourseHandler = ({
	chapterId,
	course,
	moduleId,
}: UseCourseProps): UseCourseHandler => {
	const [current, setCurrent] = React.useState<CurrentState>({
		chapterId,
		moduleId,
	});

	const chapters = React.useMemo(() => course?.chapters || [], [course]);
	const { data: chapter } = useGetChapter({ chapter_id: chapterId });

	const modules = React.useMemo(() => {
		if (!chapter) return [];
		return chapter.modules;
	}, [chapters]);

	const { currentChapter, currentModule, moduleIndex, hasNextModule, hasPreviousModule } =
		React.useMemo(() => {
			const currentChapter = chapters.find((chapter) => chapter.id === current.chapterId);
			const currentModule = modules.find((module) => module.id === current.moduleId);
			const moduleIndex = currentModule
				? modules.findIndex((module) => module.id === currentModule.id)
				: -1;

			return {
				currentChapter,
				currentModule,
				moduleIndex,
				hasNextModule: moduleIndex < modules.length - 1 && moduleIndex !== -1,
				hasPreviousModule: moduleIndex > 0,
			};
		}, [chapters, current.chapterId, modules, current.moduleId]);

	const isFirstChapter = React.useMemo(() => {
		const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === current.chapterId);
		return currentChapterIndex === 0;
	}, [chapters]);

	const isLastChapter = React.useMemo(() => {
		const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === current.chapterId);
		return currentChapterIndex === chapters.length - 1;
	}, [chapters, current.chapterId]);

	const isLastModule = React.useMemo(() => {
		const currentModuleIndex = modules.findIndex((module) => module.id === current.moduleId);
		return isLastChapter && currentModuleIndex === modules.length - 1;
	}, [modules, current.moduleId]);

	const isQuizPassed = React.useMemo(() => {
		if (!currentModule) return false;
		return Boolean(currentModule.is_passed);
	}, [currentModule]);

	const onNextModule = React.useCallback(() => {
		if (!hasNextModule || moduleIndex === -1 || !currentModule?.is_passed) return;
		const nextModule = modules[moduleIndex + 1];
		setCurrent({
			moduleId: nextModule.id,
			chapterId: nextModule.chapter,
		});
	}, [hasNextModule, moduleIndex, modules]);

	const onPreviousModule = React.useCallback(() => {
		if (!hasPreviousModule || moduleIndex === -1) return;
		const previousModule = modules[moduleIndex - 1];
		setCurrent({
			moduleId: previousModule.id,
			chapterId: previousModule.chapter,
		});
	}, [hasPreviousModule, moduleIndex, modules]);

	const canProceed = React.useMemo(
		() =>
			Boolean((course?.current_module_progress_percentage || 0) >= 50 || currentModule?.is_passed),
		[course?.current_module_progress_percentage, currentModule]
	);

	React.useEffect(() => {
		if (modules.length && !current.moduleId) {
			setCurrent({
				moduleId: modules[0].id,
				chapterId: modules[0].chapter,
			});
		}
	}, [modules]);

	return {
		canProceed,
		currentChapter,
		currentModule,
		hasNextModule,
		hasPreviousModule,
		isFirstChapter,
		isLastChapter,
		isLastModule,
		isQuizPassed,
		onNextModule,
		onPreviousModule,
	};
};
