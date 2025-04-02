import type { ChapterModuleProps, ChapterResp, SingleCourseResp } from "@/types";
import { createReportableStore } from "../middleware";

interface CourseStore {
	canProceed: boolean;
	chapters: ChapterResp[];
	course: SingleCourseResp | null;
	currentChapterId: string;
	currentModuleId: string;
	currentChapter: ChapterResp | null;
	currentModule: ChapterModuleProps | null;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isQuizPassed: (moduleId: string) => boolean;
	modules: ChapterModuleProps[];
	onNextModule: () => void;
	onPreviousModule: () => void;
	onSelectChapter: (chapterId: string) => void;
	onSelectModule: (moduleId: string) => void;
	setCourse: (course: SingleCourseResp) => void;
	setCurrentChapter: (chapter: ChapterResp) => void;
	setCurrentChapterId: (chapterId: string) => void;
	setCurrentModule: (module: ChapterModuleProps) => void;
	setCurrentModuleId: (moduleId: string) => void;
	setModules: (modules: ChapterModuleProps[]) => void;
}

const initialState: CourseStore = {
	canProceed: false,
	chapters: [],
	course: null,
	currentChapterId: "",
	currentModuleId: "",
	currentChapter: null,
	currentModule: null,
	hasNextChapter: false,
	hasNextModule: false,
	hasPreviousChapter: false,
	hasPreviousModule: false,
	isQuizPassed: () => false,
	modules: [],
	onNextModule: () => {},
	onPreviousModule: () => {},
	onSelectChapter: () => {},
	onSelectModule: () => {},
	setCourse: () => {},
	setCurrentChapter: () => {},
	setCurrentChapterId: () => {},
	setCurrentModule: () => {},
	setCurrentModuleId: () => {},
	setModules: () => {},
};

const useCourseStore = createReportableStore<CourseStore>((set, get) => {
	const updateNavigationState = () => {
		const { chapters, currentChapterId, modules, currentModuleId } = get();

		if (!currentChapterId || !chapters.length) return;

		const chapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
		const moduleIndex = currentModuleId
			? modules.findIndex((module) => module.id === currentModuleId)
			: -1;

		const currentChapter = chapters[chapterIndex] || null;
		const currentModule = moduleIndex >= 0 ? modules[moduleIndex] : null;

		set({
			currentChapter,
			currentModule,
			hasPreviousChapter: chapterIndex > 0,
			hasNextChapter: chapterIndex < chapters.length - 1,
			hasPreviousModule: moduleIndex > 0,
			hasNextModule: moduleIndex < modules.length - 1,
			canProceed: currentModule
				? !!currentModule.is_passed
				: (currentChapter?.current_module_progress_percentage ?? 0) >= 50,
		});
	};

	return {
		...initialState,

		setCourse: (course) => {
			const firstChapter = course.chapters.length > 0 ? course.chapters[0] : null;
			const firstModule = firstChapter?.modules?.length ? firstChapter.modules[0] : null;

			set({
				course,
				chapters: course.chapters,
				currentChapterId: firstChapter?.id || "",
				currentModuleId: firstModule?.id || "",
				modules: firstChapter?.modules || [],
			});

			updateNavigationState();
		},

		setCurrentChapter: (chapter) => set({ currentChapter: chapter }),

		setCurrentModule: (module) => set({ currentModule: module }),

		setModules: (modules) => {
			set({ modules });
			updateNavigationState();
		},

		setCurrentChapterId: (chapterId) => {
			const chapters = get().chapters;
			const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);

			if (chapterIndex === -1) return;

			const currentChapter = chapters[chapterIndex];
			const modules = currentChapter.modules || [];
			const firstModule = modules.length > 0 ? modules[0] : null;

			set({
				currentChapterId: chapterId,
				currentModuleId: firstModule?.id || "",
				modules,
			});

			updateNavigationState();
		},

		setCurrentModuleId: (moduleId) => {
			set({ currentModuleId: moduleId });
			updateNavigationState();
		},

		onSelectChapter: (chapterId) => {
			get().setCurrentChapterId(chapterId);
		},

		onSelectModule: (moduleId) => {
			get().setCurrentModuleId(moduleId);
		},

		onNextModule: () => {
			const { currentModuleId, modules, currentChapterId, chapters } = get();
			if (!currentModuleId || !currentChapterId) return;

			const currentModuleIndex = modules.findIndex((module) => module.id === currentModuleId);
			if (currentModuleIndex < modules.length - 1) {
				get().setCurrentModuleId(modules[currentModuleIndex + 1].id);
				return;
			}

			const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
			if (currentChapterIndex < chapters.length - 1) {
				get().setCurrentChapterId(chapters[currentChapterIndex + 1].id);
			}
		},

		onPreviousModule: () => {
			const { currentModuleId, modules, currentChapterId, chapters } = get();
			if (!currentModuleId || !currentChapterId) return;

			const currentModuleIndex = modules.findIndex((module) => module.id === currentModuleId);
			if (currentModuleIndex > 0) {
				get().setCurrentModuleId(modules[currentModuleIndex - 1].id);
				return;
			}

			const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
			if (currentChapterIndex > 0) {
				const previousChapter = chapters[currentChapterIndex - 1];
				get().setCurrentChapterId(previousChapter.id);
				const previousModules = previousChapter.modules || [];
				if (previousModules.length > 0) {
					get().setCurrentModuleId(previousModules[previousModules.length - 1].id);
				}
			}
		},

		isQuizPassed: (moduleId) => {
			const module = get().modules.find((module) => module.id === moduleId);
			return !!module?.is_passed;
		},

		get chapters() {
			return get().course?.chapters || [];
		},

		get modules() {
			const { chapters, currentChapterId } = get();
			const currentChapter = chapters.find((chapter) => chapter.id === currentChapterId);
			return currentChapter?.modules || [];
		},

		get currentChapter() {
			const { chapters, currentChapterId } = get();
			return chapters.find((chapter) => chapter.id === currentChapterId) || null;
		},

		get currentModule() {
			const { modules, currentModuleId } = get();
			return modules.find((module) => module.id === currentModuleId) || null;
		},

		get canProceed() {
			const { currentChapter, currentModule } = get();
			return (
				((currentChapter?.current_module_progress_percentage ?? 0) >= 50 ||
					!!currentModule?.is_passed) ??
				false
			);
		},

		get hasNextChapter() {
			const { chapters, currentChapterId } = get();
			if (!currentChapterId || !chapters.length) return false;

			const currentIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
			return currentIndex < chapters.length - 1;
		},

		get hasNextModule() {
			const { modules, currentModuleId } = get();
			if (!currentModuleId || !modules.length) return false;

			const currentIndex = modules.findIndex((module) => module.id === currentModuleId);
			return currentIndex < modules.length - 1;
		},

		get hasPreviousChapter() {
			const { chapters, currentChapterId } = get();
			if (!currentChapterId || !chapters.length) return false;

			const currentIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
			return currentIndex > 0;
		},

		get hasPreviousModule() {
			const { modules, currentModuleId } = get();
			if (!currentModuleId || !modules.length) return false;

			const currentIndex = modules.findIndex((module) => module.id === currentModuleId);
			return currentIndex > 0;
		},
	};
});

export { useCourseStore };
