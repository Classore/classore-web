export const endpoints = (id?: string) => {
	const auth = {
		signup: "/auth/signup",
		signin: "/auth/login",
		google_signin: "/auth/google",
		google_callback: "auth/google/callback",
		verify: "/auth/signup/verify",
		resend_code: "/auth/signup/resend-verification-code",
		forgot_password: "/auth/forgot-password",
		reset_password: "/auth/reset-password",
		profile: "/auth/profile",
		add_guardian: "/auth/add-my-guardian",
		add_wards: "/auth/add-my-wards",
		update_profile: "/auth/update-profile",
		change_password: "/auth/change-password",
	} as const;

	const bank = {
		get_banks: "/admin/payment/get-banks",
		add_account_details: "/transaction/add-bank-details",
		get_account_details: "/transaction/view-my-bank-details",
		get_withdrawal_history: "/transaction/fetch-withdrawals",
		request_withdrawal: "/transaction/make-withdrawal-request",
	} as const;

	const courses = {
		get_all: "/courses",
		get_one: `/courses/${id}`,
		create: "/courses",
		update: `/courses/${id}`,
		delete: `/courses/${id}`,
	} as const;

	const message = {
		create_room: "/chat/find-or-create-room",
		get_room: `/chat/get-room/${id}`,
		upload: "/chat/media-upload",
		fetch_messages: "/chat/fetch-room-messages",
		get_user_rooms: "/chat/fetch-user-rooms",
	} as const;

	const notifications = {
		get_all: "/notification/fetch-all",
		clear: "/notification/clear-all",
	} as const;

	const parents = {
		home: "/parent/home",
		add_ward: "/auth/add-my-wards",
		get_ward: `/parent/view-a-ward/${id}`,
		delete_ward: `/parent/delete-a-ward/${id}`,
		get_subjects: "/school/subject/fetch-all",
		vet_pack: "/school/exams/vet-study-pack-options",
	} as const;

	const school = {
		get_exams: "/school/exams/fetch-exams",
		get_exam_bundles: "/school/exams/fetch-exam-bundles",
		get_single_exam_bundle: `/school/exams/exam-bundle/view-one/${id}`,
		get_subjects: "/school/subject/fetch-all",
		get_subject: `/school/subject/view-one/${id}`,
		get_classes: "/school/subject/fetch-classes",
		create_study_timeline: "/school/exams/create-study-timeline",
		vet_study_pack: "/school/exams/vet-study-pack-options",
		get_my_courses: "/student/my-courses",
		payment_callback: "/transaction/paystack-callback",
		create_review: "/school/exams/give-a-review",
	} as const;

	const student = {
		get_my_courses: "/student/my-courses",
		get_course: `/student/view-course/${id}`,
		get_chapter: `student/view-chapter/${id}`,
		get_upcoming_events: "student/upcoming-events",
		get_leaderboard: "/student/leaderboard/fetch-all",
	} as const;

	const test_center = {
		get_all: "/school/test-mgt/test/fetch-all",
		get_one: `/school/test-mgt/test/view-one/${id}`,
		get_questions: `/school/test-mgt/fetch-questions/${id}`,
		submit: `/school/test-mgt/submit-test`,
	} as const;

	const user = {
		my_courses: "student/my-courses",
		view_course: `/student/view-course/${id}`,
		start_course: `/student/start-course/${id}`,
		update_course: `/student/update-course-progress/${id}`,
		create_courses: "/student/create-courses",
		upcoming_events: "/student/upcoming-events",
		leaderboard: "/student/leaderboard/fetch-all",
		fetch_questions: "/school/subject/fetch-questions",
		submit_quiz: "/school/subject/submit-quiz",
		get_my_plans: "/student/my-plans",
		get_single_plan: `/student/my-plans/view-one/${id}`,
		renew_plan: `/student/my-plans/renew/${id}`,
		update_course_progress: `/student/update-course-progress/${id}`,
	} as const;

	const waitlist = {
		join: `/mail/join-waitlist`,
		get: `/mail/fetch-waitlist`,
	};

	return {
		auth,
		bank,
		courses,
		message,
		notifications,
		parents,
		school,
		student,
		test_center,
		user,
		waitlist,
	};
};
