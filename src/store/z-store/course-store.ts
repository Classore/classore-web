import type { SingleCourseResp } from "@/types";
import { createPersistMiddleware } from "../middleware";

interface CourseStore {
	courses: SingleCourseResp[];
	setCourse: (course: SingleCourseResp) => void;
	getCourse: (courseId: string) => SingleCourseResp | undefined;
	updateCourse: (course: SingleCourseResp) => void;
	isExistingCourse: (courseId: string) => boolean;
	removeCourse: (courseId: string) => void;
	clearCourses: () => void;
}

const useCourseStore = createPersistMiddleware<CourseStore>(
	"classore-course-store",
	(set, get) => ({
		courses: [],

		setCourse: (course) => {
			const { courses } = get();
			if (!courses.some((c) => c.id === course.id)) {
				set({ courses: [...courses, course] });
			}
		},

		getCourse: (courseId) => {
			const courses = get().courses;
			return courses.find((c) => c.id === courseId);
		},

		updateCourse: (course) =>
			set((state) => ({
				courses: state.courses.map((c) => (c.id === course.id ? course : c)),
			})),

		removeCourse: (courseId) =>
			set((state) => ({
				courses: state.courses.filter((c) => c.id !== courseId),
			})),

		isExistingCourse: (courseId) => {
			const { courses } = get();
			return courses.some((c) => c.id === courseId);
		},

		clearCourses: () => set({ courses: [] }),
	})
);

export { useCourseStore };
