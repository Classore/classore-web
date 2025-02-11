import type { SingleBundleResp } from "@/types";

export type PersonalizedPlanProps = {
	title: string;
	description: string;
	image: string;
	type: "card" | "link" | "photo";
	href?: string;
	buttonText?: string;
};

export const INCENTIVES = [
	{
		label: "for parents",
		title: "Stay Involved in Your Child's Learning Journey",
		description:
			"Track your child's progress with real-time analytics, get updates on lessons and live sessions, manage course enrollments, and access resources to support their success.",
		image: "/assets/images/for-parents.png",
		button: "start monitoring now",
		href: "/signup",
	},
	{
		label: "for agents",
		title: "Turn Your Referrals into Earnings",
		description:
			"Earn commissions for successful referrals, track your performance with detailed analytics and start earning quickly with easy registration.",
		image: "/assets/images/for-agents.png",
		button: "start earning now",
		href: "https://marketers.classore.com",
	},
];

export const FREQUENTLY_ASKED_QUESTIONS = [
	{
		question: "What is Classore?",
		answer:
			"Classore is a platform designed to enhance learning for students, engage parents, and empower educators through seamless tools and resources.",
	},
	{
		question: "How does Classore benefit students?",
		answer:
			"Classore provides students with study materials, videos, interactive sessions, and tools to track their learning progress, helping them achieve better outcomes.",
	},
	{
		question: "Can parents use Classore?",
		answer:
			"Yes, parents can monitor their child's academic progress, stay informed about assignments, and provide support using Classore.",
	},
	{
		question: "What devices can I use to access Classore?",
		answer:
			"Classore is accessible on web browsers, smartphones, and tablets, ensuring learning anytime, anywhere.",
	},
	{
		question: "How do I join Classore?",
		answer:
			"Sign up on the platform, create an account, and explore features designed to enhance your learning or teaching experience.",
	},
	{
		question: "How do I contact support?",
		answer:
			"For help, visit the support section on the platform or email us at support@classore.com.",
	},
];

export const PERSONALIZED_PLANS: PersonalizedPlanProps[] = [
	{
		title: "Explore Courses",
		description: "Discover a variety of topics across different categories and levels.",
		image: "/assets/images/personalized-1.png",
		type: "card",
	},
	{
		title: "Interactive Learning",
		description:
			"Engage with videos, quizzes, and activities to make learning fun and effective.",
		image: "/assets/images/personalized-2.png",
		type: "card",
	},
	{
		title: "Join Live Classes",
		description: "Track your growth with detailed analytics and visual performance charts.",
		image: "/assets/images/personalized-3.png",
		type: "card",
	},
	{
		title: "Download the App",
		description:
			"Engage with bite-sized lessons that combine videos, quizzes, and activities to make learning simple, fun, and effective.",
		image: "",
		type: "link",
		href: "/",
		buttonText: "Download App",
	},
	{
		title: "",
		description: "",
		image: "/assets/images/personalized-4.png",
		type: "photo",
	},
	{
		title: "Community Forum",
		description: "Connect, discuss, and learn with peers through interactive forums.",
		image: "/assets/images/personalized-5.png",
		type: "card",
	},
	{
		title: "Interactive Messaging",
		description: "Connect, discuss, and learn with peers through interactive forums.",
		image: "/assets/images/personalized-6.png",
		type: "card",
	},
	{
		title: "Refer and Earn",
		description:
			"Engage with bite-sized lessons that combine videos, quizzes, and activities to make learning simple, fun, and effective.",
		image: "",
		type: "link",
		href: "https://marketers.classore.com",
		buttonText: "Get Started",
	},
	{
		title: "",
		description: "",
		image: "/assets/images/personalized-7.png",
		type: "photo",
	},
	{
		title: "Test Your Knowledge",
		description: "Discover a variety of topics across different categories and levels.",
		image: "/assets/images/personalized-8.png",
		type: "card",
	},
	{
		title: "Leaderboard",
		description:
			"Engage with videos, quizzes, and activities to make learning fun and effective.",
		image: "/assets/images/personalized-9.png",
		type: "card",
	},
	{
		title: "track Progress",
		description: "Track your growth with detailed analytics and visual performance charts.",
		image: "/assets/images/personalized-10.png",
		type: "card",
	},
];

export const TESTIMONIALS: SingleBundleResp["reviews"][number][] = [
	{
		rating_comment:
			"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
		rating_createdon: "7/13/2021",
		rating_examination: "275cce42-8b31-4196-bf8f-17f4ae1d6de0",
		rating_examination_bundle: "55d14242-c35a-4218-b1b0-9466e7617f2b",
		rating_id: "626e985a-6ea3-459a-aedf-cc9db6af29d5",
		rating_rating: 3,
		rating_purpose: "subject",
		rating_subject: "83450d8c-6755-4825-b277-76c51ec0e736",
		rating_user: "146f739c-be1b-40e9-8f9b-851017bb237c",
		user_first_name: "Garfield",
		user_last_name: "Macer",
		user_profile_image:
			"https://robohash.org/quisperspiciatisvoluptatum.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
		rating_createdon: "7/13/2021",
		rating_examination: "a8dec61a-99fb-48e7-9332-8296e5bc6cc2",
		rating_examination_bundle: "d81086c1-8845-48eb-b7d1-951ac0a002c8",
		rating_id: "37d76518-5595-4896-bb4c-96d0678e9ee5",
		rating_rating: 3,
		rating_purpose: "module",
		rating_subject: "dbe61938-6373-46fc-bab6-cd05620045e6",
		rating_user: "0b10bc03-248d-4e18-b82b-5df3ec9d134c",
		user_first_name: "Lenette",
		user_last_name: "Dawidowitz",
		user_profile_image: "https://robohash.org/vellaborumdistinctio.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
		rating_createdon: "7/13/2021",
		rating_examination: "59b79112-cef8-4aa1-bdb2-729e7c68ff61",
		rating_examination_bundle: "c1abca15-54bb-4d11-8743-0743cdbe44f1",
		rating_id: "3be1877e-94a0-48cf-8fb3-4c38b0b7cad9",
		rating_rating: 0,
		rating_purpose: "subject",
		rating_subject: "9cf13dd2-51c2-42f8-860d-cbb60aa0ab4f",
		rating_user: "9039024f-b022-48b1-b232-f6a039fdde10",
		user_first_name: "Carmina",
		user_last_name: "Thacker",
		user_profile_image: "https://robohash.org/quiquiatempora.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
		rating_createdon: "7/13/2021",
		rating_examination: "ed05189e-e29b-4310-ac63-68020c6e86bb",
		rating_examination_bundle: "7bdc4a14-ff58-4cba-9bfd-3fd4381957f5",
		rating_id: "4f0e98be-872d-42d6-86e6-841ae81658e0",
		rating_rating: 4,
		rating_purpose: "module",
		rating_subject: "b57f70b8-493c-4a0a-8941-c4feffd22432",
		rating_user: "f25fa72a-217f-4fd4-869a-c4334270bd7c",
		user_first_name: "Manolo",
		user_last_name: "Murie",
		user_profile_image: "https://robohash.org/idipsamut.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
		rating_createdon: "7/13/2021",
		rating_examination: "56b5ea25-0002-4af3-94eb-68a1f633eb0e",
		rating_examination_bundle: "c180cbcd-1c25-4f51-a936-a95be791999f",
		rating_id: "82559ffa-e5da-4b84-a853-a5fc521aa0fb",
		rating_rating: 4,
		rating_purpose: "module",
		rating_subject: "8c903ed2-0826-40d2-91f9-2af8fcb5beb3",
		rating_user: "03d62164-6f40-4f70-8b64-b89c0a2f6e47",
		user_first_name: "My",
		user_last_name: "Stimpson",
		user_profile_image: "https://robohash.org/evenietetexpedita.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
		rating_createdon: "7/13/2021",
		rating_examination: "daf82cb5-b921-492d-bfd0-0ebf4e66d397",
		rating_examination_bundle: "b8d778d1-07b6-4972-972c-ffd5a53865e3",
		rating_id: "3009a521-aa09-47bf-8c85-306ccbfe7e31",
		rating_rating: 5,
		rating_purpose: "course",
		rating_subject: "60888563-7be3-4ffb-b18b-218e992cfeb6",
		rating_user: "9dc20898-5c94-47ef-882b-698f8533b409",
		user_first_name: "Tymon",
		user_last_name: "Durrett",
		user_profile_image: "https://robohash.org/delenitiiureullam.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
		rating_createdon: "7/13/2021",
		rating_examination: "43fd7edc-d4ff-44bd-8f36-390581c83779",
		rating_examination_bundle: "d1ae4724-0c62-4721-886a-452c141b4466",
		rating_id: "87f6eab4-6d9b-4aa8-b6f2-6bc0201727bf",
		rating_rating: 1,
		rating_purpose: "course",
		rating_subject: "96c45543-190e-4bae-b120-80aea21cb377",
		rating_user: "7cd5485d-380d-40fb-b1aa-6dbd56271cf9",
		user_first_name: "Marta",
		user_last_name: "Marjanovic",
		user_profile_image: "https://robohash.org/autnisiporro.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
		rating_createdon: "7/13/2021",
		rating_examination: "9baf5980-b139-441e-ad03-55c72c266bec",
		rating_examination_bundle: "369f559e-2d66-49ad-bef0-36142f6ee74d",
		rating_id: "9a504188-6715-4436-b6b4-1161594841b5",
		rating_rating: 3,
		rating_purpose: "module",
		rating_subject: "ffe05dd0-9582-4fbd-b555-4c358e8fa404",
		rating_user: "59ad867b-2b77-4470-8009-0095f4b25775",
		user_first_name: "Sybille",
		user_last_name: "Blondel",
		user_profile_image: "https://robohash.org/quibusdamnequeest.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
		rating_createdon: "7/13/2021",
		rating_examination: "0f67c549-72a5-4fc8-96a7-597c210fe48c",
		rating_examination_bundle: "44b0da8a-812d-4f02-a54d-18eb56d53519",
		rating_id: "a62a3c38-ed45-4247-bc6d-fc979a8d49f3",
		rating_rating: 4,
		rating_purpose: "subject",
		rating_subject: "855615ee-7cb2-4243-92c0-0e4c88529c6c",
		rating_user: "3b756c10-8a81-4544-9ef8-2d52761db2f6",
		user_first_name: "Suzann",
		user_last_name: "Filyakov",
		user_profile_image: "https://robohash.org/estquosint.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
		rating_createdon: "7/13/2021",
		rating_examination: "7c59440e-ab76-467f-9901-09d94eb13909",
		rating_examination_bundle: "ba7eb9ff-7bc2-4ab8-a0dd-5cadfdeaa659",
		rating_id: "a9afce6e-22a2-4d26-9e1e-e4ebe1f27963",
		rating_rating: 0,
		rating_purpose: "course",
		rating_subject: "a4ff6e75-65e3-4cdb-b05a-57091ccc249a",
		rating_user: "f1bce103-2ec6-4855-a332-06dc20848d27",
		user_first_name: "Meredith",
		user_last_name: "Pragnell",
		user_profile_image: "https://robohash.org/blanditiisducimussed.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
		rating_createdon: "7/13/2021",
		rating_examination: "323069e6-e051-45b4-876f-f15b0482728a",
		rating_examination_bundle: "f259a0b6-ac5e-4ba6-aa55-a28956bb36bf",
		rating_id: "234e9f7f-3c08-4f13-ab52-8cf8cb992da7",
		rating_rating: 4,
		rating_purpose: "subject",
		rating_subject: "02bcdf80-9bf5-4118-b72b-b55db77f7b3e",
		rating_user: "5b23ae45-1a62-44b5-9c3b-a53ecd13fbe3",
		user_first_name: "Rosmunda",
		user_last_name: "Lyburn",
		user_profile_image:
			"https://robohash.org/dolorematqueveritatis.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
		rating_createdon: "7/13/2021",
		rating_examination: "56afcfc1-3009-4a3e-a4c6-293c56a45579",
		rating_examination_bundle: "2b5a6add-f357-41ae-91ae-f6d0baeac10f",
		rating_id: "8170b71b-c577-400d-b749-6dbcb1e36d90",
		rating_rating: 1,
		rating_purpose: "module",
		rating_subject: "95c6e30b-a709-40c3-8acb-68e3eb3d8af3",
		rating_user: "661c0b94-9408-42c9-81c6-5968a60a0da9",
		user_first_name: "Mady",
		user_last_name: "Yeskov",
		user_profile_image: "https://robohash.org/quiaddeserunt.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
		rating_createdon: "7/13/2021",
		rating_examination: "ade2e533-b70d-4e26-ba45-9a92ba2072a9",
		rating_examination_bundle: "08ef0de1-605d-4371-9b2d-004f829b240b",
		rating_id: "3f7e29b8-f1f3-4c53-b8a7-6bba3ed54c9c",
		rating_rating: 1,
		rating_purpose: "module",
		rating_subject: "c03c0b17-0741-4a14-8a99-a1521c6172bc",
		rating_user: "ebe7b58b-2d3e-4737-b5c3-567a0aea03f9",
		user_first_name: "Sebastian",
		user_last_name: "Leeburn",
		user_profile_image: "https://robohash.org/estautculpa.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
		rating_createdon: "7/13/2021",
		rating_examination: "7089d5c3-7881-4c9a-b931-ea1a7e71b465",
		rating_examination_bundle: "468409a2-200a-4d1e-bd41-afd10874fb42",
		rating_id: "c7ccc9ac-286a-4596-919f-32f0bb496198",
		rating_rating: 0,
		rating_purpose: "module",
		rating_subject: "639d9ba6-ad2e-40d3-9f9f-a5aee65d0dcf",
		rating_user: "c1d46695-a9a3-494a-8b56-b82641820aa1",
		user_first_name: "Jammie",
		user_last_name: "Pougher",
		user_profile_image: "https://robohash.org/quihicfacere.png?size=50x50&set=set1",
	},
	{
		rating_comment:
			"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
		rating_createdon: "7/13/2021",
		rating_examination: "467ce06a-6fbf-479e-a7a3-e90ff08eb173",
		rating_examination_bundle: "6c6aab47-edb9-4e76-ae35-501d104c3e08",
		rating_id: "a8fcf263-3399-4181-93f5-9bee58cd0819",
		rating_rating: 3,
		rating_purpose: "course",
		rating_subject: "b642705a-bc5e-43e4-8ada-b0f07bcbbc7f",
		rating_user: "0329da8c-1966-4efc-908d-cfe7a967027d",
		user_first_name: "Kalila",
		user_last_name: "Lane",
		user_profile_image: "https://robohash.org/solutaquialiquid.png?size=50x50&set=set1",
	},
];
