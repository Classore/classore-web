import type { ChapterModuleProps, ChapterResp, SingleCourseResp } from "@/types";
import { createReportableStore } from "../middleware";

interface CourseStore {
	canProceed: boolean;
	course: SingleCourseResp | null;
	currentChapter: ChapterResp | null;
	currentModule: ChapterModuleProps | null;
	hasNextModule: boolean;
	hasPreviousModule: boolean;
	onNextModule: () => void;
	onPreviousModule: () => void;
	setCurrentCurrentChapter: (chapter: ChapterResp) => void;
	setCurrentCurrentModule: (module: ChapterModuleProps) => void;
	setCourse: (course: SingleCourseResp) => void;
}

const initialState: CourseStore = {
	canProceed: false,
	course: null,
	currentChapter: null,
	currentModule: null,
	hasNextModule: false,
	hasPreviousModule: false,
	onNextModule: () => {},
	onPreviousModule: () => {},
	setCurrentCurrentChapter: () => {},
	setCurrentCurrentModule: () => {},
	setCourse: () => {},
};

const useCourseStore = createReportableStore<CourseStore>(() => ({
	...initialState,
}));

export { useCourseStore };
