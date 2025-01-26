export const endpoints = (id?: string) => {
	return {
		auth: {
			signup: "/auth/signup",
			signin: "/auth/login",
			google_signin: "/auth/google",
			verify: "/auth/signup/verify",
			resend_code: "/auth/signup/resend-verification-code",
			forgot_password: "/auth/forgot-password",
			reset_password: "/auth/reset-password",
			profile: "/auth/profile",
			google_auth: "/auth/google",
			add_wards: "/auth/add-my-wards",
		},
		courses: {
			get_all: "/courses",
			get_one: `/courses/${id}`,
			create: "/courses",
			update: `/courses/${id}`,
			delete: `/courses/${id}`,
		},
		quiz: {},
		school: {
			get_exams: "/school/exams/fetch-exams",
			get_exam_bundles: "/school/exams/fetch-exam-bundles",
			get_subjects: "/school/subject/fetch-all",
			get_classes: "/school/subject/fetch-classes",
			create_study_timeline: "/school/exams/create-study-timeline",
			vet_study_pack: "/school/exams/vet-study-pack-options",
			get_my_courses: "/student/my-courses",
		},
		user: {
			my_courses: "student/my-courses",
			view_course: `/student/view-course/${id}`,
			start_course: `/student/start-course/${id}`,
			create_courses: "/student/create-courses",
			upcoming_events: "/student/upcoming-events",
			leaderboard: "/student/leaderboard/fetch-all",
			fetch_questions: "/school/subject/fetch-questions",
			submit_quiz: "/school/subject/submit-quiz",
		},
		waitlist: {
			join: `/mail/join-waitlist`,
			get: `/mail/fetch-waitlist`,
		},
	};
};
