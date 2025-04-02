import React from "react";

import type { ChapterModuleProps, ChapterResp } from "@/types";

interface UseCourseProps {
	chapters: ChapterResp[];
	modules: ChapterModuleProps[];
}

interface UseCourseHandler {
	canProceed: boolean;
	chapterId: string;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isQuizPassed: (moduleId: string) => boolean;
	moduleId: string;
	onNextChapter: () => void;
	onNextModule: () => void;
	onPreviousChapter: () => void;
	onPreviousModule: () => void;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModuleId: (moduleId: string) => void;
}

export const useCourseHandler = ({ chapters, modules }: UseCourseProps): UseCourseHandler => {
	const [currentChapterId, setCurrentChapterId] = React.useState(chapters[0]?.id);
	const [currentModuleId, setCurrentModuleId] = React.useState(modules[0]?.id);

	const currentChapter = React.useMemo(() => {
		if (!chapters) return null;
		const chapter = chapters.find((chapter) => chapter?.id === currentChapterId);
		if (!chapter) return null;
		return chapter;
	}, [chapters, currentChapterId]);

	const currentModule = React.useMemo(() => {
		if (!modules) return null;
		const module = modules.find((module) => module?.id === currentModuleId);
		if (!module) return null;
		return module;
	}, [currentModuleId, modules]);

	const canProceed = React.useMemo(() => {
		if (!currentModule) return false;
		if (!currentModule.is_passed) return false;
		return currentModule.is_passed && (currentChapter?.current_module_progress_percentage ?? 0) >= 50;
	}, [currentChapter, currentModule, currentModuleId]);

	const hasNextChapter = React.useMemo(() => {
		const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id === currentChapterId);
		return currentChapterIndex < chapters.length - 1;
	}, [chapters, currentChapterId]);

	const hasPreviousChapter = React.useMemo(() => {
		const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id === currentChapterId);
		return currentChapterIndex > 0;
	}, [chapters, currentChapterId]);

	const hasNextModule = React.useMemo(() => {
		const currentModuleIndex = modules.findIndex((module) => module?.id === currentModuleId);
		return currentModuleIndex < modules.length - 1;
	}, [currentModuleId, modules]);

	const hasPreviousModule = React.useMemo(() => {
		const currentModuleIndex = modules.findIndex((module) => module?.id === currentModuleId);
		return currentModuleIndex > 0;
	}, [currentModuleId, modules]);

	const isQuizPassed = React.useCallback(
		(moduleId: string) => {
			const module = modules.find((module) => module?.id === moduleId);
			if (!module) return false;
			return module.is_passed || false;
		},
		[modules]
	);

	const onNextChapter = React.useCallback(() => {
		if (!currentChapter) return;
		const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id === currentChapter?.id);
		const nextChapter = chapters[currentChapterIndex + 1];
		if (!nextChapter) return;
		setCurrentChapterId(nextChapter?.id);
		setCurrentModuleId(nextChapter.modules[0]?.id);
	}, [currentChapter, chapters]);

	const onPreviousChapter = React.useCallback(() => {
		if (!currentChapter) return;
		const currentChapterIndex = chapters.findIndex((chapter) => chapter?.id === currentChapter?.id);
		const previousChapter = chapters[currentChapterIndex - 1];
		if (!previousChapter) return;
		setCurrentChapterId(previousChapter?.id);
		setCurrentModuleId(previousChapter.modules[0]?.id);
	}, [currentChapter, chapters]);

	const onNextModule = React.useCallback(() => {
		if (!currentModule) return;
		const currentModuleIndex = modules.findIndex((module) => module?.id === currentModule?.id);
		const nextModule = modules[currentModuleIndex + 1];
		if (!nextModule) return;
		setCurrentModuleId(nextModule?.id);
	}, [currentModule, modules]);

	const onPreviousModule = React.useCallback(() => {
		if (!currentModule) return;
		const currentModuleIndex = modules.findIndex((module) => module?.id === currentModule?.id);
		const previousModule = modules[currentModuleIndex - 1];
		if (!previousModule) return;
		setCurrentModuleId(previousModule?.id);
	}, [currentModule, modules]);

	return {
		canProceed,
		chapterId: currentChapterId,
		hasNextChapter,
		hasNextModule,
		hasPreviousChapter,
		hasPreviousModule,
		isQuizPassed,
		moduleId: currentModuleId,
		onNextChapter,
		onNextModule,
		onPreviousChapter,
		onPreviousModule,
		setCurrentChapterId,
		setCurrentModuleId,
	};
};
