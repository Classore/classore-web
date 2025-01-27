export const endpoints = (id?: string) => {
	const auth = {
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
	} as const

	const courses = {
		get_all: "/courses",
		get_one: `/courses/${id}`,
		create: "/courses",
		update: `/courses/${id}`,
		delete: `/courses/${id}`,
	} as const

	const school = {
		get_exams: "/school/exams/fetch-exams",
		get_exam_bundles: "/school/exams/fetch-exam-bundles",
		get_single_exam_bundle: `/school/exams/exam-bundle/view-one/${id}`,
		get_subjects: "/school/subject/fetch-all",
		get_classes: "/school/subject/fetch-classes",
		create_study_timeline: "/school/exams/create-study-timeline",
		vet_study_pack: "/school/exams/vet-study-pack-options",
		get_my_courses: "/student/my-courses",
	} as const

	const waitlist = {
		join: `/mail/join-waitlist`,
		get: `/mail/fetch-waitlist`,
	}

	return { auth, courses, school, waitlist }
}
