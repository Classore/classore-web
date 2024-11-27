import type { CategoryProps, ChallengeProps } from "@/types"

export const challenges: ChallengeProps[] = [
	{
		id: "1",
		challenges_challenge_is_completed: false,
		challenges_challenge_name: "Score 70% in any quiz",
		challenges_challenge_points: 10,
	},
	{
		id: "2",
		challenges_challenge_is_completed: true,
		challenges_challenge_name: "Complete 3 chapters in English",
		challenges_challenge_points: 7,
	},
	{
		id: "3",
		challenges_challenge_is_completed: false,
		challenges_challenge_name: "invite a friend",
		challenges_challenge_points: 53,
	},
]

export const categories: CategoryProps[] = [
	{
		id: "71d80a8f-2124-4b6e-a5d6-3df7b2f6b172",
		createdOn: "16/07/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 12626.89,
		reviews: [],
		featured: true,
		summary:
			"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
		subjects: [
			{
				title: "Accounting",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
				chapters: 26,
				materials: 41,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6d739f19-c323-4c8f-83e3-9128dd44be32",
				createdOn: "23/03/2024",
			},
			{
				title: "Environmental Science",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
				chapters: 30,
				materials: 41,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "23095c96-d564-4657-9d8d-fe2465d65118",
				createdOn: "30/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: 36,
				materials: 39,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "d9439b7e-3f40-41e5-83dd-a9a1c07089c5",
				createdOn: "25/04/2024",
			},
			{
				title: "Biology",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: 37,
				materials: 47,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1093b02d-fa1b-4cef-b78b-5158629d986d",
				createdOn: "16/10/2024",
			},
			{
				title: "History",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
				chapters: 24,
				materials: 44,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "19dcf9e3-af49-4a47-9ff5-64f5eee890a0",
				createdOn: "15/07/2024",
			},
			{
				title: "Biology",
				description:
					"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
				chapters: 29,
				materials: 33,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0c1985a5-ebe9-4293-bc1c-4690c1d399f1",
				createdOn: "18/05/2024",
			},
			{
				title: "French",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
				chapters: 16,
				materials: 45,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e196e45f-da7c-4c6c-a54d-008fa01196a5",
				createdOn: "20/05/2024",
			},
			{
				title: "Biology",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: 38,
				materials: 47,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a191c1ae-ee1f-428d-9b48-cc290b5d3603",
				createdOn: "29/10/2024",
			},
			{
				title: "English Literature",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: 33,
				materials: 44,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "33446a70-f81c-40fd-b591-dc45ba77dbe7",
				createdOn: "10/01/2024",
			},
			{
				title: "Mathematics",
				description: "Fusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 15,
				materials: 45,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "480327bf-883c-415b-8847-eff976802b5c",
				createdOn: "25/04/2024",
			},
		],
	},
	{
		id: "39c30f92-0c06-49aa-b58a-f621df2e91ce",
		createdOn: "16/11/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 11972.3,
		reviews: [],
		featured: false,
		summary:
			"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
		subjects: [
			{
				title: "Computer Science",
				description:
					"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: 24,
				materials: 39,
				quiz: 12,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0fb7dbdd-849a-443c-878d-eec9179c8c0c",
				createdOn: "01/07/2024",
			},
			{
				title: "Geography",
				description:
					"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: 27,
				materials: 28,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "34b162b5-2843-4679-85ec-1ce05b40f9ec",
				createdOn: "24/12/2023",
			},
			{
				title: "Sociology",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
				chapters: 36,
				materials: 32,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "21072d35-e590-495c-84e1-8c82f714b584",
				createdOn: "25/10/2024",
			},
			{
				title: "Art and Design",
				description: "Fusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 27,
				materials: 40,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fc153fc7-d5f7-49e0-9ca7-bb4ba979769a",
				createdOn: "28/08/2024",
			},
			{
				title: "Arabic",
				description:
					"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: 37,
				materials: 48,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "912bd37a-a5a7-4ece-ae63-2de42ceff9e9",
				createdOn: "05/07/2024",
			},
			{
				title: "Music",
				description:
					"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 21,
				materials: 36,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "4cde70ca-1b98-45e9-9d1e-7ad3c219a5b1",
				createdOn: "19/06/2024",
			},
			{
				title: "Spanish",
				description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: 15,
				materials: 28,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "aa8c4c5d-9204-42fa-ac5e-9d73dc4824b1",
				createdOn: "18/06/2024",
			},
			{
				title: "French",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
				chapters: 34,
				materials: 46,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "de0f7a7e-4106-4b1b-8238-ae2f58ae9daf",
				createdOn: "26/08/2024",
			},
		],
	},
	{
		id: "b738ee76-b97d-46bf-b49e-337786efdb48",
		createdOn: "14/02/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "WAEC Exam Prep Bundle",
		price: 8140.08,
		reviews: [],
		featured: false,
		summary:
			"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
		subjects: [],
	},
	{
		id: "3a9051c3-614b-4307-b2d1-d57017978d90",
		createdOn: "06/03/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "NECO Exam Prep Bundle",
		price: 5452.29,
		reviews: [],
		featured: false,
		summary:
			"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
		subjects: [
			{
				title: "Physics",
				description:
					"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
				chapters: 26,
				materials: 33,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fbb16fa3-d7d1-4b74-aef3-d221dbc18f67",
				createdOn: "01/06/2024",
			},
			{
				title: "Home Economics",
				description: "In congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: 34,
				materials: 26,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "985da5fa-41ab-472c-ba0d-e251dae3f5aa",
				createdOn: "18/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: 34,
				materials: 32,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7ff0d109-68b9-4267-afa8-86b51395efc4",
				createdOn: "06/01/2024",
			},
			{
				title: "German",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: 29,
				materials: 35,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "d45c90d6-5b2c-41ea-9b92-e344b4a0b591",
				createdOn: "21/06/2024",
			},
		],
	},
	{
		id: "eff84701-ea0f-48d5-9898-115d94e474a2",
		createdOn: "15/07/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "LSAT Exam Prep Bundle",
		price: 12156.87,
		reviews: [],
		featured: true,
		summary:
			"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
		subjects: [
			{
				title: "Physics",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: 37,
				materials: 43,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3434d24c-566e-4439-86ca-b3c95b6a1e54",
				createdOn: "12/06/2024",
			},
			{
				title: "Accounting",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: 38,
				materials: 45,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "cab93157-44aa-4c9b-bc97-dff7bc0efbcb",
				createdOn: "09/11/2024",
			},
			{
				title: "Archaeology",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
				chapters: 31,
				materials: 27,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "df60fef9-599d-4d17-a7fd-1ac53683d482",
				createdOn: "22/12/2023",
			},
			{
				title: "Music",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: 27,
				materials: 44,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9a70611e-d4fd-4883-b524-bb504404d777",
				createdOn: "30/01/2024",
			},
			{
				title: "Business Studies",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: 30,
				materials: 34,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9b2954ff-991b-4930-ba57-065c00ea6c0b",
				createdOn: "28/11/2023",
			},
			{
				title: "Home Economics",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: 37,
				materials: 36,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "33c75e15-1f0d-4850-b908-487f88f4eaeb",
				createdOn: "01/03/2024",
			},
			{
				title: "Archaeology",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: 29,
				materials: 38,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "ab552996-cc78-4fb0-8dd3-6cee912f33a9",
				createdOn: "22/01/2024",
			},
		],
	},
	{
		id: "b3493a6e-da64-47ec-9fda-46d61af96003",
		createdOn: "10/07/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "IELTS Exam Prep Bundle",
		price: 13860.75,
		reviews: [],
		featured: false,
		summary:
			"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
		subjects: [
			{
				title: "Home Economics",
				description:
					"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: 32,
				materials: 47,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "ad983b68-f7e9-480e-91de-0646729e0e4d",
				createdOn: "25/06/2024",
			},
			{
				title: "Archaeology",
				description:
					"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: 32,
				materials: 32,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5a228b76-d557-4c01-bc50-84e156941483",
				createdOn: "25/04/2024",
			},
			{
				title: "German",
				description:
					"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: 25,
				materials: 43,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a9857c94-2263-4403-bfb3-04ad2e7ba51f",
				createdOn: "11/03/2024",
			},
			{
				title: "Biology",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: 23,
				materials: 32,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "21716796-800f-482c-ac8a-437d4e7cf6f0",
				createdOn: "07/04/2024",
			},
			{
				title: "Religious Studies",
				description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: 15,
				materials: 44,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "00483cb7-0ece-4b18-a2d7-8c6d590e4b2c",
				createdOn: "19/08/2024",
			},
			{
				title: "English Literature",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
				chapters: 29,
				materials: 25,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "24e93e5a-923a-4762-ad93-f677a30671b3",
				createdOn: "05/04/2024",
			},
			{
				title: "Spanish",
				description:
					"Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: 35,
				materials: 50,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "617421d8-4665-45a3-9194-0392eae4758e",
				createdOn: "06/07/2024",
			},
			{
				title: "Art and Design",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: 32,
				materials: 35,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c51ec9b3-4039-45e7-982d-9b75b6e80c1c",
				createdOn: "06/09/2024",
			},
			{
				title: "Spanish",
				description:
					"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
				chapters: 22,
				materials: 43,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "287cc8c7-0dae-4074-9f67-63594655d85d",
				createdOn: "29/07/2024",
			},
			{
				title: "Politics",
				description:
					"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: 27,
				materials: 29,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e15d12e1-cc60-4192-a158-587e66a10997",
				createdOn: "22/05/2024",
			},
		],
	},
	{
		id: "f8a72848-96d2-4bc7-8eda-f232a20c2827",
		createdOn: "19/04/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "TOEFL Exam Prep Bundle",
		price: 10568.23,
		reviews: [],
		featured: false,
		summary:
			"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
		subjects: [
			{
				title: "Spanish",
				description:
					"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
				chapters: 29,
				materials: 32,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "16995270-74fc-4ff2-b803-9db1b7cd81a4",
				createdOn: "22/06/2024",
			},
			{
				title: "English Literature",
				description:
					"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
				chapters: 40,
				materials: 37,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c70e7b52-8d44-401e-85c4-dfa7277e19d5",
				createdOn: "12/07/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
				chapters: 35,
				materials: 28,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5f6bd5e9-c8e1-4361-95c9-b7bc10fc2a19",
				createdOn: "29/06/2024",
			},
			{
				title: "Chemistry",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: 28,
				materials: 38,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "15f97006-7126-4608-a2a4-94ee0fcc9f9f",
				createdOn: "16/01/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
				chapters: 36,
				materials: 42,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b95a5d25-7c10-46c4-be6b-ec90b6e3a332",
				createdOn: "02/04/2024",
			},
			{
				title: "Physics",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: 34,
				materials: 42,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fa4fc9a2-5cbb-40c2-a3a3-4df15c72a236",
				createdOn: "29/01/2024",
			},
			{
				title: "French",
				description:
					"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
				chapters: 28,
				materials: 25,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "f0e47623-3b39-412f-b533-4859703db823",
				createdOn: "20/09/2024",
			},
			{
				title: "Arabic",
				description:
					"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: 37,
				materials: 35,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1bc75ad7-04b9-4369-807f-b56d55d38736",
				createdOn: "11/08/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: 18,
				materials: 39,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3572bb18-52a1-40d7-bdf3-c52f88c32a6c",
				createdOn: "22/06/2024",
			},
			{
				title: "Physics",
				description:
					"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: 34,
				materials: 47,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8c41e490-d0e4-446f-aa17-78ee04acdd26",
				createdOn: "11/08/2024",
			},
		],
	},
	{
		id: "7bbfa5af-c94d-4e8f-901e-14088d948f0c",
		createdOn: "05/07/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "SAT Exam Prep Bundle",
		price: 13340.7,
		reviews: [],
		featured: true,
		summary:
			"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
		subjects: [
			{
				title: "Commerce",
				description:
					"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: 15,
				materials: 43,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "72dfa8a0-f702-4be5-a65b-506c0173ad6b",
				createdOn: "31/03/2024",
			},
			{
				title: "Commerce",
				description:
					"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
				chapters: 34,
				materials: 37,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "925163cd-40fb-4f8b-903e-eecb8eb40eb0",
				createdOn: "08/09/2024",
			},
			{
				title: "French",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
				chapters: 34,
				materials: 48,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "56d7ebb1-2005-4fa4-8b6d-0ff5632ba83c",
				createdOn: "26/07/2024",
			},
			{
				title: "Physics",
				description:
					"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
				chapters: 27,
				materials: 29,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a32d28a2-a7d4-409a-8a69-edf054b4a97a",
				createdOn: "12/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: 34,
				materials: 25,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "800612e4-ec6b-40a3-b3a8-d00dfc9043b2",
				createdOn: "24/04/2024",
			},
			{
				title: "French",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: 19,
				materials: 36,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e8a0aab3-8723-4f83-80be-1754f4b4c8ac",
				createdOn: "10/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: 38,
				materials: 29,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3cf6a862-34c8-4e24-a4ea-ce3ec2bb7d2b",
				createdOn: "18/10/2024",
			},
			{
				title: "Chemistry",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: 37,
				materials: 29,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3630d6f2-759d-4e7d-beab-1ededb6eeb21",
				createdOn: "11/11/2024",
			},
			{
				title: "Music",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 40,
				materials: 27,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0cbd2901-5f97-467d-8712-e3ce05f5b82e",
				createdOn: "30/07/2024",
			},
			{
				title: "Physics",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: 23,
				materials: 35,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e0e27a4d-567e-48c9-95c5-7248a48547c8",
				createdOn: "02/01/2024",
			},
		],
	},
	{
		id: "3047675d-f2fb-4dfa-a9fe-7c6083772202",
		createdOn: "24/08/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 8114.34,
		reviews: [],
		featured: false,
		summary:
			"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
		subjects: [
			{
				title: "Media Studies",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 26,
				materials: 48,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8937acdf-9000-46fa-990b-87a121a58708",
				createdOn: "13/06/2024",
			},
			{
				title: "Mathematics",
				description:
					"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: 15,
				materials: 36,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "48f7e74f-035c-4581-8309-b9a6687b8f1c",
				createdOn: "31/12/2023",
			},
			{
				title: "History",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: 24,
				materials: 27,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "175b4c55-0d51-4e46-baf7-20aeec86beff",
				createdOn: "18/05/2024",
			},
			{
				title: "Media Studies",
				description:
					"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: 26,
				materials: 44,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "42d5436b-9cff-4a4b-a535-f73bd8b751c1",
				createdOn: "21/08/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
				chapters: 20,
				materials: 44,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7f6ed718-0a2d-4c46-9742-fcfc73547a94",
				createdOn: "14/08/2024",
			},
			{
				title: "Computer Science",
				description:
					"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
				chapters: 22,
				materials: 34,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "97599689-28ef-47ae-abdc-2383622de45d",
				createdOn: "11/06/2024",
			},
			{
				title: "Arabic",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
				chapters: 37,
				materials: 33,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "32dc319e-bc4e-49b4-ae09-5139921db308",
				createdOn: "11/08/2024",
			},
		],
	},
	{
		id: "b75a789c-f420-41bf-88d5-e1786b03ba3b",
		createdOn: "18/05/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 10349.08,
		reviews: [],
		featured: false,
		summary:
			"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
		subjects: [
			{
				title: "Archaeology",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
				chapters: 34,
				materials: 41,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "475fe625-3676-439a-ba65-4eb4e2d14d3f",
				createdOn: "25/01/2024",
			},
			{
				title: "Arabic",
				description:
					"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
				chapters: 28,
				materials: 25,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "d0b57f3e-f51f-40df-802c-2940faa5fb9d",
				createdOn: "05/08/2024",
			},
			{
				title: "History",
				description:
					"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: 40,
				materials: 38,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "977f66ac-6f66-42e1-b511-2d7ec29bfbf2",
				createdOn: "14/10/2024",
			},
			{
				title: "Mathematics",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: 33,
				materials: 29,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "42bb87f5-b39f-44c9-b4be-00beb5e97bcc",
				createdOn: "07/03/2024",
			},
			{
				title: "Art and Design",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: 27,
				materials: 43,
				quiz: 12,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "909b2fbd-8e21-4c52-af91-b119e8c3ef11",
				createdOn: "04/08/2024",
			},
		],
	},
	{
		id: "e0a19c32-98cd-44c0-bc9b-995cf976cabc",
		createdOn: "08/08/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "WAEC Exam Prep Bundle",
		price: 5184.04,
		reviews: [],
		featured: true,
		summary:
			"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
		subjects: [
			{
				title: "English Literature",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: 20,
				materials: 45,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "20e4438b-f842-4c91-a4bc-eb5dfe9ba4dc",
				createdOn: "05/06/2024",
			},
			{
				title: "Biology",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: 30,
				materials: 26,
				quiz: 12,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "327694de-5d47-40db-bc5b-3ce3482822e9",
				createdOn: "07/10/2024",
			},
			{
				title: "Geography",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: 15,
				materials: 49,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6eac6a59-31a7-40d2-ab62-91bb512f881f",
				createdOn: "09/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: 22,
				materials: 27,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8dccb7f7-b13b-4604-8dc5-2da188c6ef82",
				createdOn: "17/07/2024",
			},
			{
				title: "Environmental Science",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
				chapters: 15,
				materials: 49,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "60c9bea2-8d2e-43af-a35d-ce897a07c534",
				createdOn: "06/02/2024",
			},
			{
				title: "Business Studies",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: 16,
				materials: 26,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bd863c1e-3190-47f2-8a9e-984684632789",
				createdOn: "28/08/2024",
			},
			{
				title: "Additional Mathematics",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: 23,
				materials: 41,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "4ec01697-4cc7-4553-aeee-bf0cd8572ae5",
				createdOn: "05/08/2024",
			},
			{
				title: "Art and Design",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: 26,
				materials: 31,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b52e5630-091e-46e0-abd7-40260d8e4a5a",
				createdOn: "01/11/2024",
			},
			{
				title: "Media Studies",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: 38,
				materials: 44,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c82b3187-32a6-4982-9c58-9dd7ee7e2ffa",
				createdOn: "28/10/2024",
			},
			{
				title: "Art and Design",
				description:
					"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: 18,
				materials: 32,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "00aceacf-d9fd-4356-9eca-c4284e21b3cf",
				createdOn: "29/08/2024",
			},
		],
	},
	{
		id: "333adddc-f015-4359-9ea0-770fff0e486f",
		createdOn: "26/08/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "NECO Exam Prep Bundle",
		price: 9526.71,
		reviews: [],
		featured: false,
		summary:
			"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
		subjects: [
			{
				title: "Home Economics",
				description:
					"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
				chapters: 18,
				materials: 25,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b1ae9dcb-1794-48de-aa2d-36127a680dac",
				createdOn: "21/09/2024",
			},
			{
				title: "Commerce",
				description:
					"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
				chapters: 21,
				materials: 31,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "cfe8989c-a93f-4e51-9b8f-3f2d21ec7f86",
				createdOn: "18/12/2023",
			},
		],
	},
	{
		id: "47fef2df-4da4-4287-8ae6-ffa36008129b",
		createdOn: "31/10/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "LSAT Exam Prep Bundle",
		price: 11563.77,
		reviews: [],
		featured: false,
		summary:
			"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
		subjects: [
			{
				title: "Politics",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
				chapters: 32,
				materials: 28,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "615d6836-db5b-438a-b6ed-064b568c6ac7",
				createdOn: "04/04/2024",
			},
			{
				title: "Spanish",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
				chapters: 28,
				materials: 37,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3a284792-37c3-485a-a679-34353ae89775",
				createdOn: "14/05/2024",
			},
		],
	},
	{
		id: "061bb40d-515a-4036-ba99-d223068d96bc",
		createdOn: "11/07/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "IELTS Exam Prep Bundle",
		price: 10999.99,
		reviews: [],
		featured: false,
		summary:
			"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
		subjects: [
			{
				title: "Accounting",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: 25,
				materials: 47,
				quiz: 12,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b22551fc-74e7-4116-81e2-1536565fc0d8",
				createdOn: "07/08/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
				chapters: 20,
				materials: 29,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9ed1ee1e-64f1-4457-a1a0-2a2048791178",
				createdOn: "24/04/2024",
			},
			{
				title: "Accounting",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: 40,
				materials: 40,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bd8ad0aa-d4b4-46e9-8001-7480bfb74649",
				createdOn: "26/08/2024",
			},
			{
				title: "Physics",
				description: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: 23,
				materials: 36,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "73f8090a-e282-42b1-8fc4-89826fa146c6",
				createdOn: "20/07/2024",
			},
			{
				title: "Commerce",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
				chapters: 15,
				materials: 50,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c8291393-c1af-4119-ae71-894be85c88be",
				createdOn: "13/01/2024",
			},
			{
				title: "Mathematics",
				description:
					"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
				chapters: 23,
				materials: 50,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a76d53cd-8631-4684-ad90-5d751face570",
				createdOn: "25/08/2024",
			},
			{
				title: "Accounting",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: 28,
				materials: 50,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bdfaf763-c3d5-4528-ade9-f0fa4ae100e0",
				createdOn: "26/05/2024",
			},
		],
	},
	{
		id: "6833487d-3001-45e2-abbd-6a8aa0b4dbf4",
		createdOn: "24/04/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "TOEFL Exam Prep Bundle",
		price: 7992.23,
		reviews: [],
		featured: false,
		summary: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
		subjects: [
			{
				title: "Spanish",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
				chapters: 40,
				materials: 37,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7cc1e34b-faf6-431a-9f26-f0503560ffe6",
				createdOn: "20/04/2024",
			},
			{
				title: "Music",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
				chapters: 29,
				materials: 50,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9396dc4f-f4a9-488a-aa61-e5c7673cda2f",
				createdOn: "17/08/2024",
			},
			{
				title: "Philosophy",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
				chapters: 31,
				materials: 29,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "632ca3c8-4a78-44d8-a745-e88293d2a3ce",
				createdOn: "03/08/2024",
			},
			{
				title: "Sociology",
				description:
					"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
				chapters: 23,
				materials: 38,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e3b0edf1-8ac9-44ad-aad3-d51cb8f9a337",
				createdOn: "03/10/2024",
			},
			{
				title: "Archaeology",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
				chapters: 34,
				materials: 38,
				quiz: 12,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "37f06314-6ee6-4a8e-80eb-0463f3ddbeb0",
				createdOn: "06/11/2024",
			},
			{
				title: "English Literature",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: 39,
				materials: 31,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1cf231a8-19db-4b40-93dd-c959921e5613",
				createdOn: "02/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: 38,
				materials: 39,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7e0e0d18-ecb2-4bc9-9b31-326089f62a38",
				createdOn: "05/12/2023",
			},
		],
	},
	{
		id: "1fbc02c1-c673-4d76-9468-933e1f6f1924",
		createdOn: "31/03/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "SAT Exam Prep Bundle",
		price: 8513.57,
		reviews: [],
		featured: false,
		summary:
			"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
		subjects: [
			{
				title: "Spanish",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: 21,
				materials: 49,
				quiz: 15,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b104d21e-5b47-4184-b45f-b9a48b96755d",
				createdOn: "28/02/2024",
			},
			{
				title: "German",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: 19,
				materials: 50,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "67663b27-9636-421b-b469-2e04059ed665",
				createdOn: "26/06/2024",
			},
			{
				title: "English Literature",
				description:
					"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: 31,
				materials: 37,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6af7f554-5d01-423d-9a3b-e3b947b10330",
				createdOn: "05/05/2024",
			},
			{
				title: "Geography",
				description:
					"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: 40,
				materials: 25,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "27a48a17-0335-40c9-81f8-b39aed5100be",
				createdOn: "28/06/2024",
			},
		],
	},
	{
		id: "41d576ab-4292-42ee-b2ff-294c658d0ace",
		createdOn: "21/01/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 9211.6,
		reviews: [],
		featured: false,
		summary:
			"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
		subjects: [
			{
				title: "Chemistry",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: 34,
				materials: 37,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5d148704-6787-438a-b2bf-b674118fec85",
				createdOn: "24/01/2024",
			},
			{
				title: "Commerce",
				description:
					"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: 24,
				materials: 41,
				quiz: 19,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6cc8be1f-a843-44eb-b9fc-fe9d1c169897",
				createdOn: "29/09/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
				chapters: 28,
				materials: 33,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7a0668d6-bc93-47b6-b3f6-5d8e5b6fde4f",
				createdOn: "17/01/2024",
			},
			{
				title: "Mathematics",
				description:
					"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
				chapters: 18,
				materials: 34,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "27a266be-f3b0-44b2-80b4-c89e8c6fa438",
				createdOn: "28/12/2023",
			},
			{
				title: "Spanish",
				description:
					"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
				chapters: 29,
				materials: 31,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e9940723-dc6d-474a-9775-3e16678f7511",
				createdOn: "09/06/2024",
			},
			{
				title: "Business Studies",
				description:
					"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
				chapters: 39,
				materials: 42,
				quiz: 20,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0378a68c-8c3c-49af-876e-e35adc90941a",
				createdOn: "17/02/2024",
			},
			{
				title: "English Literature",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: 27,
				materials: 43,
				quiz: 13,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8d7d5cef-9f85-4050-b216-6b76adc9eb2d",
				createdOn: "13/08/2024",
			},
			{
				title: "Spanish",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: 31,
				materials: 26,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "53c157eb-6642-4ab2-b76e-a1af8c265f04",
				createdOn: "02/07/2024",
			},
		],
	},
	{
		id: "2f09913c-6526-4669-8e0b-f545d36e943b",
		createdOn: "21/08/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "JAMB Exam Prep Bundle",
		price: 7306.25,
		reviews: [],
		featured: false,
		summary:
			"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
		subjects: [
			{
				title: "Additional Mathematics",
				description:
					"In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
				chapters: 32,
				materials: 25,
				quiz: 10,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "91709bd7-b962-4496-b5e2-1507d87f0ea8",
				createdOn: "19/07/2024",
			},
		],
	},
	{
		id: "b9a5d14c-fd1d-49ef-99d0-480b1679904d",
		createdOn: "02/03/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "WAEC Exam Prep Bundle",
		price: 14856.46,
		reviews: [],
		featured: false,
		summary:
			"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
		subjects: [
			{
				title: "Religious Studies",
				description:
					"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
				chapters: 29,
				materials: 30,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "903f0c6c-929b-453b-aa17-dd45fac401be",
				createdOn: "03/01/2024",
			},
			{
				title: "Home Economics",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: 27,
				materials: 41,
				quiz: 17,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6afdbc81-0aae-4db3-abf2-5419a5f95108",
				createdOn: "17/12/2023",
			},
			{
				title: "Additional Mathematics",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: 28,
				materials: 33,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bca1a927-869e-48ea-9d12-bbcc3c0e6401",
				createdOn: "07/04/2024",
			},
			{
				title: "English Language",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
				chapters: 40,
				materials: 46,
				quiz: 11,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "dd22ed2a-21fe-497d-b54c-d7b21b68ec81",
				createdOn: "18/11/2024",
			},
		],
	},
	{
		id: "c184d742-cb32-452f-8951-7a5e1ce61306",
		createdOn: "30/04/2024",
		image:
			"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "NECO Exam Prep Bundle",
		price: 8783.58,
		reviews: [],
		featured: false,
		summary:
			"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
		subjects: [
			{
				title: "English Language",
				description:
					"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
				chapters: 27,
				materials: 26,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9a3561ee-69e2-4437-9edc-5f2251716b06",
				createdOn: "28/11/2023",
			},
			{
				title: "English Literature",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: 18,
				materials: 36,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a5a93d07-32dd-4de8-a34e-3f4c781d74d9",
				createdOn: "08/06/2024",
			},
			{
				title: "Art and Design",
				description:
					"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: 34,
				materials: 47,
				quiz: 14,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1aa2b894-334e-4d47-85fa-854076b4c167",
				createdOn: "07/06/2024",
			},
			{
				title: "Philosophy",
				description:
					"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: 18,
				materials: 31,
				quiz: 18,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "dd78746a-26d6-4f38-b58e-dc148b5b3626",
				createdOn: "17/01/2024",
			},
			{
				title: "Additional Mathematics",
				description:
					"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: 21,
				materials: 44,
				quiz: 16,
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "45a36ee6-cde9-4678-8e6c-f834d5b6bcd6",
				createdOn: "09/03/2024",
			},
		],
	},
]
