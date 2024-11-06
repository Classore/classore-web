export const endpoints = (id?: string) => {
	const auth = {
		signup: "/auth/signup",
		signin: "/auth/signin",
	}

	const courses = {
		get_all: "/courses",
		get_one: `/courses/${id}`,
		create: "/courses",
		update: `/courses/${id}`,
		delete: `/courses/${id}`,
	}

	const waitlist = {
		join: `/mail/join-waitlist`,
	}

	return { auth, courses, waitlist }
}
