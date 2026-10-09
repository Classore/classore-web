import type { SingleBundleResp } from "@/types";

export type PersonalizedPlanProps = {
	title: string;
	description: string;
	image: string;
	type: "card" | "link" | "photo" | "modal";
	href?: string;
	buttonText?: string;
	isModal?: boolean;
};

export const EXAMS = [
	{ label: "cibn", image: "/assets/logos/cibn.png" },
	{ label: "gmat", image: "/assets/logos/gmat.png" },
	{ label: "gre", image: "/assets/logos/gre.png" },
	{ label: "ib", image: "/assets/logos/ib.png" },
	{ label: "ican", image: "/assets/logos/ican.png" },
	{ label: "ielts", image: "/assets/logos/ielts.png" },
	{ label: "igsce", image: "/assets/logos/igsce.png" },
	{ label: "ijmb", image: "/assets/logos/ijmb.png" },
	{ label: "jamb", image: "/assets/logos/jamb.png" },
	{ label: "jupeb", image: "/assets/logos/jupeb.png" },
	{ label: "lsac", image: "/assets/logos/lsac.png" },
	{ label: "mdcn", image: "/assets/logos/mdcn.png" },
	{ label: "nabteb", image: "/assets/logos/nabteb.png" },
	{ label: "neco", image: "/assets/logos/neco.png" },
	{ label: "pmi", image: "/assets/logos/pmi.png" },
	{ label: "sat", image: "/assets/logos/sat.png" },
	{ label: "toefl", image: "/assets/logos/toefl.png" },
	{ label: "waec", image: "/assets/logos/waec.png" },
];

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
		image: "/assets/images/for-agents-2.png",
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
		image: "/assets/images/1.png",
		type: "card",
	},
	{
		title: "Interactive Learning",
		description: "Engage with videos, quizzes, and activities to make learning fun and effective.",
		image: "/assets/images/2.png",
		type: "card",
	},
	{
		title: "Join Live Classes",
		description: "Track your growth with detailed analytics and visual performance charts.",
		image: "/assets/images/3.png",
		type: "card",
	},
	{
		title: "Download the App",
		description:
			"Engage with bite-sized lessons that combine videos, quizzes, and activities to make learning simple, fun, and effective.",
		image: "",
		type: "modal",
		href: "/",
		buttonText: "Download App",
		isModal: true,
	},
	{
		title: "",
		description: "",
		image: "/assets/images/4.png",
		type: "photo",
	},
	{
		title: "Community Forum",
		description: "Connect, discuss, and learn with peers through interactive forums.",
		image: "/assets/images/5.png",
		type: "card",
	},
	{
		title: "Interactive Messaging",
		description: "Connect, discuss, and learn with peers through interactive forums.",
		image: "/assets/images/6.png",
		type: "card",
	},
	{
		title: "Join the Classore referer program",
		description: "Inspire student success while building your own steady stream of passive income.",
		image: "",
		type: "link",
		href: "/refer-and-earn",
		buttonText: "Get Started",
	},
	{
		title: "",
		description: "",
		image: "/assets/images/7.png",
		type: "photo",
	},
	{
		title: "Test Your Knowledge",
		description: "Discover a variety of topics across different categories and levels.",
		image: "/assets/images/8.png",
		type: "card",
	},
	{
		title: "Leaderboard",
		description: "Engage with videos, quizzes, and activities to make learning fun and effective.",
		image: "/assets/images/9.png",
		type: "card",
	},
	{
		title: "Track Progress",
		description: "Track your growth with detailed analytics and visual performance charts.",
		image: "/assets/images/10.png",
		type: "card",
	},
];

export const TESTIMONIALS: (SingleBundleResp["reviews"][number] & { user_role?: string })[] = [
	{
		rating_id: "testimonial-01",
		rating_comment:
			"The timed CBT practice mode and step-by-step solutions for Physics and Chemistry were a complete game changer for me. I went from scoring 214 in my first mock exam to 314 in the actual UTME! Classore made the difference.",
		rating_createdon: "2/14/2026",
		rating_examination: "jamb-utme",
		rating_examination_bundle: "utme-science-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "physics",
		rating_user: "user-01",
		user_first_name: "Adebayo",
		user_last_name: "Ogunleye",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo&backgroundColor=b6e3f4",
		user_role: "JAMB UTME Top Scorer (314)",
	},
	{
		rating_id: "testimonial-02",
		rating_comment:
			"As a working parent, having the Parent Dashboard to monitor my daughter's daily study streaks and quiz performance gave me complete peace of mind. Her teachers noticed how much her Mathematics confidence improved.",
		rating_createdon: "2/18/2026",
		rating_examination: "waec-wassce",
		rating_examination_bundle: "waec-comprehensive-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "mathematics",
		rating_user: "user-02",
		user_first_name: "Dr. Folake",
		user_last_name: "Balogun",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Folake&backgroundColor=ffd5dc",
		user_role: "Parent of SS3 Student",
	},
	{
		rating_id: "testimonial-03",
		rating_comment:
			"I used Classore every evening after school to revise WAEC past questions by topic. The theory marking guide showed me exactly how WAEC examiners grade answers. I cleared 8 A1s in one sitting!",
		rating_createdon: "1/22/2026",
		rating_examination: "waec-wassce",
		rating_examination_bundle: "waec-science-bundle",
		rating_rating: 5,
		rating_purpose: "course",
		rating_subject: "chemistry",
		rating_user: "user-03",
		user_first_name: "Chidinma",
		user_last_name: "Nwosu",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chidinma&backgroundColor=c0aede",
		user_role: "WASSCE Distinctions Achiever",
	},
	{
		rating_id: "testimonial-04",
		rating_comment:
			"Financial Accounting and Economics used to be my biggest headache. The tutor videos on Classore broke down balance sheets and national income so simply. Scored straight A's in both subjects.",
		rating_createdon: "2/05/2026",
		rating_examination: "waec-wassce",
		rating_examination_bundle: "waec-commercial-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "accounting",
		rating_user: "user-04",
		user_first_name: "Ibrahim",
		user_last_name: "Sani",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim&backgroundColor=d1d4f9",
		user_role: "Commercial SS3 Student",
	},
	{
		rating_id: "testimonial-05",
		rating_comment:
			"The AI study assistant on Classore is unbelievable. Whenever I get stuck on a difficult calculus or trigonometry question late at night, it gives clear explanations without giving away the answer directly. It's like having a 24/7 private tutor.",
		rating_createdon: "1/30/2026",
		rating_examination: "jamb-utme",
		rating_examination_bundle: "utme-science-bundle",
		rating_rating: 5,
		rating_purpose: "module",
		rating_subject: "mathematics",
		rating_user: "user-05",
		user_first_name: "Favour",
		user_last_name: "Adeleke",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Favour&backgroundColor=ffdfbf",
		user_role: "First-Year Computer Science, UNILAG",
	},
	{
		rating_id: "testimonial-06",
		rating_comment:
			"Classore is worth every single naira. Enrolling both my children here was the best academic investment I made this year. The platform is clean, distraction-free, and aligned with the Nigerian curriculum.",
		rating_createdon: "2/10/2026",
		rating_examination: "neco-ssce",
		rating_examination_bundle: "neco-bundle",
		rating_rating: 5,
		rating_purpose: "course",
		rating_subject: "general",
		rating_user: "user-06",
		user_first_name: "Engr. Patrick",
		user_last_name: "Uzoma",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick&backgroundColor=c0aede",
		user_role: "Parent of 2 Secondary Students",
	},
	{
		rating_id: "testimonial-07",
		rating_comment:
			"Practicing under timed exam conditions on Classore helped me conquer my exam anxiety completely. The leaderboard streaks kept me consistent every single day. Scored 302 in JAMB on my first attempt!",
		rating_createdon: "1/15/2026",
		rating_examination: "jamb-utme",
		rating_examination_bundle: "utme-arts-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "english",
		rating_user: "user-07",
		user_first_name: "Zainab",
		user_last_name: "Abdullahi",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab&backgroundColor=ffd5dc",
		user_role: "Law Aspirant, UI",
	},
	{
		rating_id: "testimonial-08",
		rating_comment:
			"The JUPEB study pack bridged the gap between secondary school syllabus and university entrance standards. The comprehensive lecture notes and mock drills helped me secure direct entry admission smoothly.",
		rating_createdon: "2/01/2026",
		rating_examination: "jupeb",
		rating_examination_bundle: "jupeb-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "biology",
		rating_user: "user-08",
		user_first_name: "Tunde",
		user_last_name: "Bakare",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde&backgroundColor=b6e3f4",
		user_role: "Pre-Degree / JUPEB Scholar",
	},
	{
		rating_id: "testimonial-09",
		rating_comment:
			"Classore’s video lessons for Literature in English and Government are exceptional. The character analysis for all recommended novels made answering theory questions effortless. I gained admission to OAU!",
		rating_createdon: "1/28/2026",
		rating_examination: "waec-wassce",
		rating_examination_bundle: "waec-arts-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "literature",
		rating_user: "user-09",
		user_first_name: "Blessing",
		user_last_name: "Bassey",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing&backgroundColor=d1d4f9",
		user_role: "Undergraduate, OAU",
	},
	{
		rating_id: "testimonial-10",
		rating_comment:
			"What I love most is how the question bank explains the 'why' behind each correct option, not just pointing to option C or D. It completely trained my critical thinking for WAEC and NECO exams.",
		rating_createdon: "2/11/2026",
		rating_examination: "neco-ssce",
		rating_examination_bundle: "neco-science-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "biology",
		rating_user: "user-10",
		user_first_name: "Emeka",
		user_last_name: "Okonkwo",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka&backgroundColor=ffdfbf",
		user_role: "SS3 Science Student",
	},
	{
		rating_id: "testimonial-11",
		rating_comment:
			"The structured curriculum saved my son from jumping haphazardly across scattered YouTube videos. He had a clear daily study path with quizzes after each lesson that kept him accountable.",
		rating_createdon: "1/19/2026",
		rating_examination: "waec-wassce",
		rating_examination_bundle: "waec-comprehensive-bundle",
		rating_rating: 5,
		rating_purpose: "course",
		rating_subject: "general",
		rating_user: "user-11",
		user_first_name: "Mrs. Ngozi",
		user_last_name: "Eze",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi&backgroundColor=ffd5dc",
		user_role: "Parent & High School Educator",
	},
	{
		rating_id: "testimonial-12",
		rating_comment:
			"I scored 321 in JAMB 2026! Classore’s past question simulations and instant speed analytics showed me exactly where I was losing seconds in English and Chemistry. Highly recommended to every serious Nigerian student.",
		rating_createdon: "2/25/2026",
		rating_examination: "jamb-utme",
		rating_examination_bundle: "utme-science-bundle",
		rating_rating: 5,
		rating_purpose: "subject",
		rating_subject: "chemistry",
		rating_user: "user-12",
		user_first_name: "Kelechi",
		user_last_name: "Nnamdi",
		user_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelechi&backgroundColor=b6e3f4",
		user_role: "UTME Top Scorer (321)",
	},
];

export const REFERRAL_STEPS = [
	{
		step: 1,
		title: "Submit Your Application",
		descriptions: [
			{
				label:
					"Fill out the Marketer Application Form here (link to external page or download form or email).",
			},
			{
				label:
					"Provide accurate information such as your full name, email, phone number, and a few details about why you are interested in promoting Classore.",
			},
		],
	},
	{
		step: 2,
		title: "Application Review by Our Team",
		descriptions: [
			{
				label: "Once your application is submitted, our admin team will carefully review your details.",
			},
			{
				label:
					"We assess applications based on marketing potential, communication skills, and overall fit with our mission.",
			},
			{ label: "Note that only selected applicants will be contacted." },
		],
	},
	{
		step: 3,
		title: "Admin Creates Your Marketer Account",
		descriptions: [
			{
				label:
					"If your application is approved, an admin will manually create your marketer account in our system.",
			},
			{ label: "This ensures full security and control over who can promote Classore." },
		],
	},
	{
		step: 4,
		title: "Receive Your Invitation Email",
		descriptions: [
			{
				label: "After account creation, you will receive an official invitation email from Classore.",
			},
			{
				label:
					"The email will contain a special link that will direct you to a secure page where you can set your desired password.",
			},
			{ label: "This link is personalized for you and must not be shared." },
		],
	},
	{
		step: 5,
		title: "Access Your Marketer Dashboard",
		descriptions: [
			{
				label: "Once you set your password, you will gain access to your exclusive marketer dashboard.",
			},
			{
				label: "From your dashboard, you can:",
				options: [
					"View your unique referral link.",
					"Track the number of students you've referred.",
					"Monitor your earnings and payouts.",
					"Access promotional materials to boost your marketing efforts.",
				],
			},
		],
	},
	{
		step: 6,
		title: "Start Promoting Classore",
		descriptions: [
			{
				label:
					"Share your referral link anywhere: WhatsApp, blogs, YouTube, Instagram, Facebook, emails, etc.",
			},
			{
				label:
					"Every time a student signs up through your link, it is recorded under your account automatically",
			},
		],
	},
];
