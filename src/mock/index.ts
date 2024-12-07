import type {
	CategoryProps,
	ChallengeProps,
	CommunityProps,
	EventProps,
	LeaderboardProps,
	NotificationProps,
	UserChartProps,
} from "@/types"

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
		challenges_challenge_name: "Complete 3 chapters in Mathematics",
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
				chapters: [],
				materials: 41,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6d739f19-c323-4c8f-83e3-9128dd44be32",
				createdOn: "23/03/2024",
			},
			{
				title: "Environmental Science",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
				chapters: [],
				materials: 41,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "23095c96-d564-4657-9d8d-fe2465d65118",
				createdOn: "30/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: [],
				materials: 39,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "d9439b7e-3f40-41e5-83dd-a9a1c07089c5",
				createdOn: "25/04/2024",
			},
			{
				title: "Biology",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: [],
				materials: 47,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1093b02d-fa1b-4cef-b78b-5158629d986d",
				createdOn: "16/10/2024",
			},
			{
				title: "History",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
				chapters: [],
				materials: 44,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "19dcf9e3-af49-4a47-9ff5-64f5eee890a0",
				createdOn: "15/07/2024",
			},
			{
				title: "Biology",
				description:
					"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
				chapters: [],
				materials: 33,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0c1985a5-ebe9-4293-bc1c-4690c1d399f1",
				createdOn: "18/05/2024",
			},
			{
				title: "French",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
				chapters: [],
				materials: 45,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e196e45f-da7c-4c6c-a54d-008fa01196a5",
				createdOn: "20/05/2024",
			},
			{
				title: "Biology",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: [],
				materials: 47,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a191c1ae-ee1f-428d-9b48-cc290b5d3603",
				createdOn: "29/10/2024",
			},
			{
				title: "English Literature",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: [],
				materials: 44,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "33446a70-f81c-40fd-b591-dc45ba77dbe7",
				createdOn: "10/01/2024",
			},
			{
				title: "Mathematics",
				description: "Fusce consequat. Nulla nisl. Nunc nisl.",
				chapters: [
					{
						id: "1",
						title: "Algebraic Structures and Equations",
						description:
							"Advanced algebraic manipulation, solving complex equations, and understanding mathematical structures.",
						summary:
							"This chapter explores sophisticated algebraic techniques, including polynomial equations, system of equations, and advanced factorization methods.",
						transcript: [
							{
								id: "1",
								duration: [0, 15],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Introduction",
							},
							{
								id: "2",
								duration: [15, 30],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Algebraic Manipulation",
							},
							{
								id: "3",
								duration: [30, 45],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Equations",
							},
							{
								id: "4",
								duration: [45, 60],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Polynomial Equations",
							},
							{
								id: "5",
								duration: [60, 75],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "System of Equations",
							},
							{
								id: "6",
								duration: [75, 90],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Factorization Techniques",
							},
							{
								id: "7",
								duration: [90, 105],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Advanced Applications",
							},
							{
								id: "8",
								duration: [105, 120],
								summary:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium reprehenderit sit nobis illum dolorem deserunt earum asperiores accusamus cumque, repellat in, minus eligendi voluptas dolorum laudantium numquam ratione? Ut rem aliquam deleniti, excepturi veritatis ab obcaecati vel quibusdam molestias sit nihil maiores soluta animi facere sunt maxime labore quaerat commodi, cupiditate fugiat. Tenetur a ullam modi, quasi repellendus qui repellat? Eius, consectetur culpa? Atque, fuga vel quis necessitatibus accusantium expedita quos. Ratione commodi velit, minus accusamus cum iusto quasi quod, provident delectus voluptatum, libero eum sint id eius. Earum modi fugit similique est culpa veritatis animi repellat temporibus voluptas architecto!",
								title: "Conclusion",
							},
						],
						quizzes: [
							{
								id: "1",
								date: "2024-10-27T12:05:23Z",
								questions: [
									{
										id: "q1",
										createdOn: "2024-12-01T10:00:01Z",
										question: "What is the defining property of a group in abstract algebra?",
										answers: [
											"Closure under addition",
											"Closure under multiplication with an identity element and inverse",
											"Commutative property for all elements",
										],
										correct_answer: "Closure under multiplication with an identity element and inverse",
									},
									{
										id: "q2",
										createdOn: "2024-12-01T10:00:02Z",
										question: "In the equation 3x + 5 = 17, what is the value of x?",
										answers: ["4", "3", "6"],
										correct_answer: "4",
									},
									{
										id: "q3",
										createdOn: "2024-12-01T10:00:03Z",
										question: "What is a ring in abstract algebra?",
										answers: [
											"A set with only addition operation",
											"A set with addition and multiplication operations that satisfy specific axioms",
											"A set with multiplication operation",
										],
										correct_answer:
											"A set with addition and multiplication operations that satisfy specific axioms",
									},
									{
										id: "q4",
										createdOn: "2024-12-01T10:00:04Z",
										question: "What is the difference between a field and a group?",
										answers: [
											"A field has both addition and multiplication operations, a group has only one",
											"A group has only multiplication, a field has addition and multiplication",
											"There is no difference between a field and a group",
										],
										correct_answer:
											"A field has both addition and multiplication operations, a group has only one",
									},
									{
										id: "q5",
										createdOn: "2024-12-01T10:00:05Z",
										question: "Solve the quadratic equation: x² - 4x + 4 = 0",
										answers: ["2", "4", "2 and 2"],
										correct_answer: "2",
									},
									{
										id: "q6",
										createdOn: "2024-12-01T10:00:06Z",
										question: "What is an abelian group?",
										answers: [
											"A group with no inverses",
											"A group where the operation is commutative",
											"A group with exactly two elements",
										],
										correct_answer: "A group where the operation is commutative",
									},
									{
										id: "q7",
										createdOn: "2024-12-01T10:00:07Z",
										question: "In the equation 2(x + 3) = 16, what is x?",
										answers: ["5", "4", "3"],
										correct_answer: "5",
									},
									{
										id: "q8",
										createdOn: "2024-12-01T10:00:08Z",
										question: "What property must a set have to be considered a vector space?",
										answers: [
											"Closure under scalar multiplication",
											"Only addition operation",
											"Finite number of elements",
										],
										correct_answer: "Closure under scalar multiplication",
									},
									{
										id: "q9",
										createdOn: "2024-12-01T10:00:09Z",
										question: "What is the characteristic of a field?",
										answers: [
											"The number of elements in the field",
											"The smallest positive integer n such that n * 1 = 0",
											"The number of operations in the field",
										],
										correct_answer: "The smallest positive integer n such that n * 1 = 0",
									},
									{
										id: "q10",
										createdOn: "2024-12-01T10:00:10Z",
										question: "Solve for x: log₂(x) = 3",
										answers: ["8", "6", "4"],
										correct_answer: "8",
									},
									{
										id: "q11",
										createdOn: "2024-12-01T10:00:11Z",
										question: "What is the difference between a monoid and a group?",
										answers: [
											"A monoid does not require inverse elements",
											"A monoid has no identity element",
											"A group has more operations",
										],
										correct_answer: "A monoid does not require inverse elements",
									},
									{
										id: "q12",
										createdOn: "2024-12-01T10:00:12Z",
										question: "In the equation |x - 3| = 5, what are the possible values of x?",
										answers: ["8 and -2", "6 and 0", "7 and -1"],
										correct_answer: "8 and -2",
									},
									{
										id: "q13",
										createdOn: "2024-12-01T10:00:13Z",
										question: "What is a homomorphism in abstract algebra?",
										answers: [
											"A function that preserves the structure between algebraic structures",
											"A function that creates new algebraic structures",
											"A function that destroys algebraic structures",
										],
										correct_answer: "A function that preserves the structure between algebraic structures",
									},
									{
										id: "q14",
										createdOn: "2024-12-01T10:00:14Z",
										question: "Solve the system of equations: x + y = 10, x - y = 2",
										answers: ["x = 6, y = 4", "x = 5, y = 5", "x = 4, y = 6"],
										correct_answer: "x = 6, y = 4",
									},
									{
										id: "q15",
										createdOn: "2024-12-01T10:00:15Z",
										question: "What defines an ideal in ring theory?",
										answers: [
											"A subset that is closed under addition",
											"A subset that is closed under multiplication",
											"A subset closed under addition and multiplication by ring elements",
										],
										correct_answer: "A subset closed under addition and multiplication by ring elements",
									},
									{
										id: "q16",
										createdOn: "2024-12-01T10:00:16Z",
										question: "What is the order of a group element?",
										answers: [
											"The number of times the element must be multiplied to get the identity",
											"The number of elements in the group",
											"The size of the group",
										],
										correct_answer: "The number of times the element must be multiplied to get the identity",
									},
									{
										id: "q17",
										createdOn: "2024-12-01T10:00:17Z",
										question: "Solve the exponential equation: 2ˣ = 32",
										answers: ["5", "4", "6"],
										correct_answer: "5",
									},
									{
										id: "q18",
										createdOn: "2024-12-01T10:00:18Z",
										question: "What is the fundamental theorem of algebra?",
										answers: [
											"Every polynomial has a real root",
											"Every non-constant polynomial has at least one complex root",
											"All polynomials can be factored completely",
										],
										correct_answer: "Every non-constant polynomial has at least one complex root",
									},
									{
										id: "q19",
										createdOn: "2024-12-01T10:00:19Z",
										question: "What distinguishes a field from a ring?",
										answers: [
											"Rings have no multiplication operation",
											"Fields have multiplicative inverses for all non-zero elements",
											"Rings have more complex operations",
										],
										correct_answer: "Fields have multiplicative inverses for all non-zero elements",
									},
									{
										id: "q20",
										createdOn: "2024-12-01T10:00:20Z",
										question: "Solve: sin(x) = 1/2 in the interval [0, 2π]",
										answers: ["π/6 and 5π/6", "π/4 and 3π/4", "π/3 and 2π/3"],
										correct_answer: "π/6 and 5π/6",
									},
									{
										id: "q21",
										createdOn: "2024-12-01T10:00:21Z",
										question: "What is a simple group?",
										answers: [
											"A group with few elements",
											"A group with no proper normal subgroups",
											"A group with only addition operations",
										],
										correct_answer: "A group with no proper normal subgroups",
									},
									{
										id: "q22",
										createdOn: "2024-12-01T10:00:22Z",
										question: "Solve the inequality: 2x + 3 > 7",
										answers: ["x > 2", "x < 2", "x ≥ 2"],
										correct_answer: "x > 2",
									},
									{
										id: "q23",
										createdOn: "2024-12-01T10:00:23Z",
										question: "What is a polynomial ring?",
										answers: [
											"A ring of polynomials with coefficients from another ring",
											"A ring with only linear polynomials",
											"A ring with no polynomial operations",
										],
										correct_answer: "A ring of polynomials with coefficients from another ring",
									},
									{
										id: "q24",
										createdOn: "2024-12-01T10:00:24Z",
										question: "What does it mean for a group to be cyclic?",
										answers: [
											"The group has a circular structure",
											"The group can be generated by a single element",
											"The group has no inverse elements",
										],
										correct_answer: "The group can be generated by a single element",
									},
									{
										id: "q25",
										createdOn: "2024-12-01T10:00:25Z",
										question: "Solve the rational equation: 1/(x-2) = 3/(x+1)",
										answers: ["x = 5", "x = 3", "x = 7"],
										correct_answer: "x = 5",
									},
									{
										id: "q26",
										createdOn: "2024-12-01T10:00:26Z",
										question: "What is an algebraically closed field?",
										answers: [
											"A field with finite elements",
											"A field where every non-constant polynomial has a root",
											"A field with only positive elements",
										],
										correct_answer: "A field where every non-constant polynomial has a root",
									},
									{
										id: "q27",
										createdOn: "2024-12-01T10:00:27Z",
										question: "What is the Fundamental Theorem of Galois Theory about?",
										answers: [
											"Relationship between field extensions and group theory",
											"Classification of all possible algebraic structures",
											"Proving the existence of polynomial solutions",
										],
										correct_answer: "Relationship between field extensions and group theory",
									},
									{
										id: "q28",
										createdOn: "2024-12-01T10:00:28Z",
										question: "Solve: log₃(x + 2) = 2",
										answers: ["7", "9", "5"],
										correct_answer: "7",
									},
									{
										id: "q29",
										createdOn: "2024-12-01T10:00:29Z",
										question: "What defines an integral domain?",
										answers: [
											"A ring with no zero divisors",
											"A ring with only positive elements",
											"A ring with infinite elements",
										],
										correct_answer: "A ring with no zero divisors",
									},
									{
										id: "q30",
										createdOn: "2024-12-01T10:00:30Z",
										question: "What is the definition of a perfect field?",
										answers: [
											"A field with all elements being perfect squares",
											"A field where every finite extension is separable",
											"A field with only perfect cube elements",
										],
										correct_answer: "A field where every finite extension is separable",
									},
									{
										id: "q31",
										createdOn: "2024-12-01T10:00:31Z",
										question: "Solve the parametric equation: x = 2t, y = t² + 1 when t = 2",
										answers: ["x = 4, y = 5", "x = 6, y = 7", "x = 2, y = 5"],
										correct_answer: "x = 4, y = 5",
									},
									{
										id: "q32",
										createdOn: "2024-12-01T10:00:32Z",
										question: "What is a principal ideal domain (PID)?",
										answers: [
											"A domain where every ideal is generated by a single element",
											"A domain with only principal elements",
											"A domain with no ideals",
										],
										correct_answer: "A domain where every ideal is generated by a single element",
									},
									{
										id: "q33",
										createdOn: "2024-12-01T10:00:33Z",
										question: "What characterizes a separable extension in field theory?",
										answers: [
											"All its roots are distinct",
											"It has only one extension field",
											"It cannot be extended further",
										],
										correct_answer: "All its roots are distinct",
									},
									{
										id: "q34",
										createdOn: "2024-12-01T10:00:34Z",
										question: "Solve: sin(x) * cos(x) = 1/2",
										answers: ["π/4 and 5π/4", "π/3 and 2π/3", "π/6 and 5π/6"],
										correct_answer: "π/4 and 5π/4",
									},
								],
								title: "",
								score: 80,
							},
						],
						resources: [
							{
								id: "1",
								description: "",
								file: "pptx",
								title: "Algebraic Structures and Equations",
								url: "https://en.wikipedia.org/wiki/Algebraic_structure",
							},
							{
								id: "2",
								description: "",
								file: "docx",
								title: "Polynomial Equations",
								url: "https://en.wikipedia.org/wiki/Algebraic_structure",
							},
							{
								id: "3",
								description: "",
								file: "pdf",
								title: "System of Equations",
								url: "https://en.wikipedia.org/wiki/Algebraic_structure",
							},
							{
								id: "4",
								description: "",
								file: "pdf",
								title: "Factorization Techniques",
								url: "https://en.wikipedia.org/wiki/Algebraic_structure",
							},
							{
								id: "5",
								description: "",
								file: "doc",
								title: "Advanced Applications",
								url: "https://en.wikipedia.org/wiki/Algebraic_structure",
							},
						],
						isRead: true,
					},
					{
						id: "2",
						title: "Trigonometric Functions and Identities",
						description:
							"Comprehensive study of trigonometric functions, their properties, and advanced identities.",
						summary:
							"Students will master complex trigonometric manipulations, exploring sine, cosine, and tangent functions in depth.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "3",
						title: "Coordinate Geometry",
						description:
							"Advanced exploration of geometric concepts using coordinate systems and analytical approaches.",
						summary:
							"This chapter connects algebraic methods with geometric representations, introducing complex analytical techniques.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "4",
						title: "Calculus: Limits and Continuity",
						description:
							"Introduction to fundamental concepts of calculus, focusing on limits and function continuity.",
						summary:
							"Students will explore the mathematical foundations of change, understanding how functions behave at critical points.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "5",
						title: "Derivatives and Their Applications",
						description:
							"Advanced study of derivatives, including rate of change, optimization, and mathematical modeling.",
						summary:
							"This chapter demonstrates how derivatives can be used to solve real-world problems and understand function behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "6",
						title: "Integration Techniques",
						description:
							"Comprehensive exploration of integration methods and their practical applications.",
						summary:
							"Students will master various integration techniques, understanding how to calculate areas, volumes, and accumulated quantities.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "7",
						title: "Probability Theory",
						description:
							"Advanced probability concepts, including combinatorics, conditional probability, and statistical inference.",
						summary:
							"This chapter develops sophisticated understanding of randomness, chance, and mathematical prediction.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "8",
						title: "Matrices and Linear Transformations",
						description:
							"Deep dive into matrix algebra, linear transformations, and their applications in various fields.",
						summary:
							"Students will explore how matrices can represent complex mathematical transformations and solve systems of equations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "9",
						title: "Vectors in Three-Dimensional Space",
						description:
							"Advanced vector algebra, including dot and cross products, and three-dimensional geometric applications.",
						summary:
							"This chapter extends vector concepts to three-dimensional space, providing tools for complex spatial analysis.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "10",
						title: "Exponential and Logarithmic Functions",
						description:
							"Comprehensive study of exponential growth, logarithmic properties, and their real-world applications.",
						summary:
							"Students will explore the powerful mathematical behaviors of exponential and logarithmic functions.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "11",
						title: "Complex Numbers",
						description:
							"Advanced exploration of complex number systems, including algebraic and geometric interpretations.",
						summary:
							"This chapter introduces the mathematical world beyond real numbers, exploring complex number operations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "12",
						title: "Statistical Analysis",
						description:
							"Advanced statistical methods, including hypothesis testing, regression analysis, and data interpretation.",
						summary:
							"Students will develop sophisticated skills in analyzing and interpreting mathematical and statistical data.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "13",
						title: "Series and Sequences",
						description:
							"Comprehensive study of mathematical sequences, series, and their convergence properties.",
						summary:
							"This chapter explores the fascinating world of infinite sequences and their mathematical behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "14",
						title: "Analytical Geometry of Conic Sections",
						description:
							"Advanced study of circles, ellipses, parabolas, and hyperbolas using coordinate geometry.",
						summary:
							"Students will explore the mathematical properties of conic sections and their geometric representations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "15",
						title: "Mathematical Modeling",
						description:
							"Introduction to using mathematical techniques to model real-world phenomena and solve complex problems.",
						summary:
							"This chapter demonstrates how mathematical tools can be applied to understand and predict real-world systems.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
				],
				materials: 45,
				quiz: 16,
				tags: [],
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
				chapters: [],
				materials: 39,
				quiz: 12,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0fb7dbdd-849a-443c-878d-eec9179c8c0c",
				createdOn: "01/07/2024",
			},
			{
				title: "Geography",
				description:
					"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: [],
				materials: 28,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "34b162b5-2843-4679-85ec-1ce05b40f9ec",
				createdOn: "24/12/2023",
			},
			{
				title: "Sociology",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
				chapters: [],
				materials: 32,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "21072d35-e590-495c-84e1-8c82f714b584",
				createdOn: "25/10/2024",
			},
			{
				title: "Art and Design",
				description: "Fusce consequat. Nulla nisl. Nunc nisl.",
				chapters: [],
				materials: 40,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fc153fc7-d5f7-49e0-9ca7-bb4ba979769a",
				createdOn: "28/08/2024",
			},
			{
				title: "Arabic",
				description:
					"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: [],
				materials: 48,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "912bd37a-a5a7-4ece-ae63-2de42ceff9e9",
				createdOn: "05/07/2024",
			},
			{
				title: "Music",
				description:
					"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: [],
				materials: 36,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "4cde70ca-1b98-45e9-9d1e-7ad3c219a5b1",
				createdOn: "19/06/2024",
			},
			{
				title: "Spanish",
				description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: [],
				materials: 28,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "aa8c4c5d-9204-42fa-ac5e-9d73dc4824b1",
				createdOn: "18/06/2024",
			},
			{
				title: "French",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
				chapters: [],
				materials: 46,
				quiz: 18,
				tags: [],
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
				chapters: [],
				materials: 33,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fbb16fa3-d7d1-4b74-aef3-d221dbc18f67",
				createdOn: "01/06/2024",
			},
			{
				title: "Home Economics",
				description: "In congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: [],
				materials: 26,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "985da5fa-41ab-472c-ba0d-e251dae3f5aa",
				createdOn: "18/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: [],
				materials: 32,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7ff0d109-68b9-4267-afa8-86b51395efc4",
				createdOn: "06/01/2024",
			},
			{
				title: "German",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: [],
				materials: 35,
				quiz: 18,
				tags: [],
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
				chapters: [],
				materials: 43,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3434d24c-566e-4439-86ca-b3c95b6a1e54",
				createdOn: "12/06/2024",
			},
			{
				title: "Accounting",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: [],
				materials: 45,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "cab93157-44aa-4c9b-bc97-dff7bc0efbcb",
				createdOn: "09/11/2024",
			},
			{
				title: "Archaeology",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
				chapters: [],
				materials: 27,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "df60fef9-599d-4d17-a7fd-1ac53683d482",
				createdOn: "22/12/2023",
			},
			{
				title: "Music",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: [],
				materials: 44,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9a70611e-d4fd-4883-b524-bb504404d777",
				createdOn: "30/01/2024",
			},
			{
				title: "Business Studies",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: [],
				materials: 34,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9b2954ff-991b-4930-ba57-065c00ea6c0b",
				createdOn: "28/11/2023",
			},
			{
				title: "Home Economics",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: [],
				materials: 36,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "33c75e15-1f0d-4850-b908-487f88f4eaeb",
				createdOn: "01/03/2024",
			},
			{
				title: "Archaeology",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: [],
				materials: 38,
				quiz: 11,
				tags: [],
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
				chapters: [],
				materials: 47,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "ad983b68-f7e9-480e-91de-0646729e0e4d",
				createdOn: "25/06/2024",
			},
			{
				title: "Archaeology",
				description:
					"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: [],
				materials: 32,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5a228b76-d557-4c01-bc50-84e156941483",
				createdOn: "25/04/2024",
			},
			{
				title: "German",
				description:
					"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: [],
				materials: 43,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a9857c94-2263-4403-bfb3-04ad2e7ba51f",
				createdOn: "11/03/2024",
			},
			{
				title: "Biology",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: [],
				materials: 32,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "21716796-800f-482c-ac8a-437d4e7cf6f0",
				createdOn: "07/04/2024",
			},
			{
				title: "Religious Studies",
				description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: [],
				materials: 44,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "00483cb7-0ece-4b18-a2d7-8c6d590e4b2c",
				createdOn: "19/08/2024",
			},
			{
				title: "English Literature",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
				chapters: [],
				materials: 25,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "24e93e5a-923a-4762-ad93-f677a30671b3",
				createdOn: "05/04/2024",
			},
			{
				title: "Spanish",
				description:
					"Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: [],
				materials: 50,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "617421d8-4665-45a3-9194-0392eae4758e",
				createdOn: "06/07/2024",
			},
			{
				title: "Art and Design",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: [],
				materials: 35,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c51ec9b3-4039-45e7-982d-9b75b6e80c1c",
				createdOn: "06/09/2024",
			},
			{
				title: "Spanish",
				description:
					"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
				chapters: [],
				materials: 43,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "287cc8c7-0dae-4074-9f67-63594655d85d",
				createdOn: "29/07/2024",
			},
			{
				title: "Politics",
				description:
					"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: [],
				materials: 29,
				quiz: 11,
				tags: [],
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
				chapters: [],
				materials: 32,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "16995270-74fc-4ff2-b803-9db1b7cd81a4",
				createdOn: "22/06/2024",
			},
			{
				title: "English Literature",
				description:
					"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
				chapters: [],
				materials: 37,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c70e7b52-8d44-401e-85c4-dfa7277e19d5",
				createdOn: "12/07/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
				chapters: [],
				materials: 28,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5f6bd5e9-c8e1-4361-95c9-b7bc10fc2a19",
				createdOn: "29/06/2024",
			},
			{
				title: "Chemistry",
				description:
					"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: [],
				materials: 38,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "15f97006-7126-4608-a2a4-94ee0fcc9f9f",
				createdOn: "16/01/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
				chapters: [],
				materials: 42,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b95a5d25-7c10-46c4-be6b-ec90b6e3a332",
				createdOn: "02/04/2024",
			},
			{
				title: "Physics",
				description:
					"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
				chapters: [],
				materials: 42,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "fa4fc9a2-5cbb-40c2-a3a3-4df15c72a236",
				createdOn: "29/01/2024",
			},
			{
				title: "French",
				description:
					"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
				chapters: [],
				materials: 25,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "f0e47623-3b39-412f-b533-4859703db823",
				createdOn: "20/09/2024",
			},
			{
				title: "Arabic",
				description:
					"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: [],
				materials: 35,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1bc75ad7-04b9-4369-807f-b56d55d38736",
				createdOn: "11/08/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: [],
				materials: 39,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3572bb18-52a1-40d7-bdf3-c52f88c32a6c",
				createdOn: "22/06/2024",
			},
			{
				title: "Physics",
				description:
					"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: [],
				materials: 47,
				quiz: 10,
				tags: [],
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
				chapters: [],
				materials: 43,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "72dfa8a0-f702-4be5-a65b-506c0173ad6b",
				createdOn: "31/03/2024",
			},
			{
				title: "Commerce",
				description:
					"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
				chapters: [],
				materials: 37,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "925163cd-40fb-4f8b-903e-eecb8eb40eb0",
				createdOn: "08/09/2024",
			},
			{
				title: "French",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
				chapters: [],
				materials: 48,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "56d7ebb1-2005-4fa4-8b6d-0ff5632ba83c",
				createdOn: "26/07/2024",
			},
			{
				title: "Physics",
				description:
					"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
				chapters: [],
				materials: 29,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a32d28a2-a7d4-409a-8a69-edf054b4a97a",
				createdOn: "12/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: [],
				materials: 25,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "800612e4-ec6b-40a3-b3a8-d00dfc9043b2",
				createdOn: "24/04/2024",
			},
			{
				title: "French",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
				chapters: [],
				materials: 36,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e8a0aab3-8723-4f83-80be-1754f4b4c8ac",
				createdOn: "10/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: [],
				materials: 29,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3cf6a862-34c8-4e24-a4ea-ce3ec2bb7d2b",
				createdOn: "18/10/2024",
			},
			{
				title: "Chemistry",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: [],
				materials: 29,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "3630d6f2-759d-4e7d-beab-1ededb6eeb21",
				createdOn: "11/11/2024",
			},
			{
				title: "Music",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: [],
				materials: 27,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0cbd2901-5f97-467d-8712-e3ce05f5b82e",
				createdOn: "30/07/2024",
			},
			{
				title: "Physics",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: [],
				materials: 35,
				quiz: 10,
				tags: [],
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
				chapters: [],
				materials: 48,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8937acdf-9000-46fa-990b-87a121a58708",
				createdOn: "13/06/2024",
			},
			{
				title: "Mathematics",
				description:
					"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: [
					{
						id: "1",
						title: "Algebraic Structures and Equations",
						description:
							"Advanced algebraic manipulation, solving complex equations, and understanding mathematical structures.",
						summary:
							"This chapter explores sophisticated algebraic techniques, including polynomial equations, system of equations, and advanced factorization methods.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "2",
						title: "Trigonometric Functions and Identities",
						description:
							"Comprehensive study of trigonometric functions, their properties, and advanced identities.",
						summary:
							"Students will master complex trigonometric manipulations, exploring sine, cosine, and tangent functions in depth.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "3",
						title: "Coordinate Geometry",
						description:
							"Advanced exploration of geometric concepts using coordinate systems and analytical approaches.",
						summary:
							"This chapter connects algebraic methods with geometric representations, introducing complex analytical techniques.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "4",
						title: "Calculus: Limits and Continuity",
						description:
							"Introduction to fundamental concepts of calculus, focusing on limits and function continuity.",
						summary:
							"Students will explore the mathematical foundations of change, understanding how functions behave at critical points.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "5",
						title: "Derivatives and Their Applications",
						description:
							"Advanced study of derivatives, including rate of change, optimization, and mathematical modeling.",
						summary:
							"This chapter demonstrates how derivatives can be used to solve real-world problems and understand function behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "6",
						title: "Integration Techniques",
						description:
							"Comprehensive exploration of integration methods and their practical applications.",
						summary:
							"Students will master various integration techniques, understanding how to calculate areas, volumes, and accumulated quantities.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "7",
						title: "Probability Theory",
						description:
							"Advanced probability concepts, including combinatorics, conditional probability, and statistical inference.",
						summary:
							"This chapter develops sophisticated understanding of randomness, chance, and mathematical prediction.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "8",
						title: "Matrices and Linear Transformations",
						description:
							"Deep dive into matrix algebra, linear transformations, and their applications in various fields.",
						summary:
							"Students will explore how matrices can represent complex mathematical transformations and solve systems of equations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "9",
						title: "Vectors in Three-Dimensional Space",
						description:
							"Advanced vector algebra, including dot and cross products, and three-dimensional geometric applications.",
						summary:
							"This chapter extends vector concepts to three-dimensional space, providing tools for complex spatial analysis.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "10",
						title: "Exponential and Logarithmic Functions",
						description:
							"Comprehensive study of exponential growth, logarithmic properties, and their real-world applications.",
						summary:
							"Students will explore the powerful mathematical behaviors of exponential and logarithmic functions.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "11",
						title: "Complex Numbers",
						description:
							"Advanced exploration of complex number systems, including algebraic and geometric interpretations.",
						summary:
							"This chapter introduces the mathematical world beyond real numbers, exploring complex number operations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "12",
						title: "Statistical Analysis",
						description:
							"Advanced statistical methods, including hypothesis testing, regression analysis, and data interpretation.",
						summary:
							"Students will develop sophisticated skills in analyzing and interpreting mathematical and statistical data.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "13",
						title: "Series and Sequences",
						description:
							"Comprehensive study of mathematical sequences, series, and their convergence properties.",
						summary:
							"This chapter explores the fascinating world of infinite sequences and their mathematical behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "14",
						title: "Analytical Geometry of Conic Sections",
						description:
							"Advanced study of circles, ellipses, parabolas, and hyperbolas using coordinate geometry.",
						summary:
							"Students will explore the mathematical properties of conic sections and their geometric representations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "15",
						title: "Mathematical Modeling",
						description:
							"Introduction to using mathematical techniques to model real-world phenomena and solve complex problems.",
						summary:
							"This chapter demonstrates how mathematical tools can be applied to understand and predict real-world systems.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
				],
				materials: 36,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "48f7e74f-035c-4581-8309-b9a6687b8f1c",
				createdOn: "31/12/2023",
			},
			{
				title: "History",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: [],
				materials: 27,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "175b4c55-0d51-4e46-baf7-20aeec86beff",
				createdOn: "18/05/2024",
			},
			{
				title: "Media Studies",
				description:
					"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: [],
				materials: 44,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "42d5436b-9cff-4a4b-a535-f73bd8b751c1",
				createdOn: "21/08/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
				chapters: [],
				materials: 44,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7f6ed718-0a2d-4c46-9742-fcfc73547a94",
				createdOn: "14/08/2024",
			},
			{
				title: "Computer Science",
				description:
					"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
				chapters: [],
				materials: 34,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "97599689-28ef-47ae-abdc-2383622de45d",
				createdOn: "11/06/2024",
			},
			{
				title: "Arabic",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
				chapters: [],
				materials: 33,
				quiz: 13,
				tags: [],
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
				chapters: [],
				materials: 41,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "475fe625-3676-439a-ba65-4eb4e2d14d3f",
				createdOn: "25/01/2024",
			},
			{
				title: "Arabic",
				description:
					"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
				chapters: [],
				materials: 25,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "d0b57f3e-f51f-40df-802c-2940faa5fb9d",
				createdOn: "05/08/2024",
			},
			{
				title: "History",
				description:
					"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
				chapters: [],
				materials: 38,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "977f66ac-6f66-42e1-b511-2d7ec29bfbf2",
				createdOn: "14/10/2024",
			},
			{
				title: "Mathematics",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: [
					{
						id: "1",
						title: "Algebraic Structures and Equations",
						description:
							"Advanced algebraic manipulation, solving complex equations, and understanding mathematical structures.",
						summary:
							"This chapter explores sophisticated algebraic techniques, including polynomial equations, system of equations, and advanced factorization methods.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "2",
						title: "Trigonometric Functions and Identities",
						description:
							"Comprehensive study of trigonometric functions, their properties, and advanced identities.",
						summary:
							"Students will master complex trigonometric manipulations, exploring sine, cosine, and tangent functions in depth.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "3",
						title: "Coordinate Geometry",
						description:
							"Advanced exploration of geometric concepts using coordinate systems and analytical approaches.",
						summary:
							"This chapter connects algebraic methods with geometric representations, introducing complex analytical techniques.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "4",
						title: "Calculus: Limits and Continuity",
						description:
							"Introduction to fundamental concepts of calculus, focusing on limits and function continuity.",
						summary:
							"Students will explore the mathematical foundations of change, understanding how functions behave at critical points.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "5",
						title: "Derivatives and Their Applications",
						description:
							"Advanced study of derivatives, including rate of change, optimization, and mathematical modeling.",
						summary:
							"This chapter demonstrates how derivatives can be used to solve real-world problems and understand function behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "6",
						title: "Integration Techniques",
						description:
							"Comprehensive exploration of integration methods and their practical applications.",
						summary:
							"Students will master various integration techniques, understanding how to calculate areas, volumes, and accumulated quantities.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "7",
						title: "Probability Theory",
						description:
							"Advanced probability concepts, including combinatorics, conditional probability, and statistical inference.",
						summary:
							"This chapter develops sophisticated understanding of randomness, chance, and mathematical prediction.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "8",
						title: "Matrices and Linear Transformations",
						description:
							"Deep dive into matrix algebra, linear transformations, and their applications in various fields.",
						summary:
							"Students will explore how matrices can represent complex mathematical transformations and solve systems of equations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "9",
						title: "Vectors in Three-Dimensional Space",
						description:
							"Advanced vector algebra, including dot and cross products, and three-dimensional geometric applications.",
						summary:
							"This chapter extends vector concepts to three-dimensional space, providing tools for complex spatial analysis.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "10",
						title: "Exponential and Logarithmic Functions",
						description:
							"Comprehensive study of exponential growth, logarithmic properties, and their real-world applications.",
						summary:
							"Students will explore the powerful mathematical behaviors of exponential and logarithmic functions.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "11",
						title: "Complex Numbers",
						description:
							"Advanced exploration of complex number systems, including algebraic and geometric interpretations.",
						summary:
							"This chapter introduces the mathematical world beyond real numbers, exploring complex number operations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "12",
						title: "Statistical Analysis",
						description:
							"Advanced statistical methods, including hypothesis testing, regression analysis, and data interpretation.",
						summary:
							"Students will develop sophisticated skills in analyzing and interpreting mathematical and statistical data.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "13",
						title: "Series and Sequences",
						description:
							"Comprehensive study of mathematical sequences, series, and their convergence properties.",
						summary:
							"This chapter explores the fascinating world of infinite sequences and their mathematical behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
					{
						id: "14",
						title: "Analytical Geometry of Conic Sections",
						description:
							"Advanced study of circles, ellipses, parabolas, and hyperbolas using coordinate geometry.",
						summary:
							"Students will explore the mathematical properties of conic sections and their geometric representations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "15",
						title: "Mathematical Modeling",
						description:
							"Introduction to using mathematical techniques to model real-world phenomena and solve complex problems.",
						summary:
							"This chapter demonstrates how mathematical tools can be applied to understand and predict real-world systems.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: false,
					},
				],
				materials: 29,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "42bb87f5-b39f-44c9-b4be-00beb5e97bcc",
				createdOn: "07/03/2024",
			},
			{
				title: "Art and Design",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
				chapters: [],
				materials: 43,
				quiz: 12,
				tags: [],
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
		featured: false,
		summary:
			"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
		subjects: [
			{
				title: "English Literature",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: [],
				materials: 45,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "20e4438b-f842-4c91-a4bc-eb5dfe9ba4dc",
				createdOn: "05/06/2024",
			},
			{
				title: "Biology",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: [],
				materials: 26,
				quiz: 12,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "327694de-5d47-40db-bc5b-3ce3482822e9",
				createdOn: "07/10/2024",
			},
			{
				title: "Geography",
				description:
					"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
				chapters: [],
				materials: 49,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6eac6a59-31a7-40d2-ab62-91bb512f881f",
				createdOn: "09/12/2023",
			},
			{
				title: "Art and Design",
				description:
					"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
				chapters: [],
				materials: 27,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8dccb7f7-b13b-4604-8dc5-2da188c6ef82",
				createdOn: "17/07/2024",
			},
			{
				title: "Environmental Science",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
				chapters: [],
				materials: 49,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "60c9bea2-8d2e-43af-a35d-ce897a07c534",
				createdOn: "06/02/2024",
			},
			{
				title: "Business Studies",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: [],
				materials: 26,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bd863c1e-3190-47f2-8a9e-984684632789",
				createdOn: "28/08/2024",
			},
			{
				title: "Additional Mathematics",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
				chapters: [],
				materials: 41,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "4ec01697-4cc7-4553-aeee-bf0cd8572ae5",
				createdOn: "05/08/2024",
			},
			{
				title: "Art and Design",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
				chapters: [],
				materials: 31,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b52e5630-091e-46e0-abd7-40260d8e4a5a",
				createdOn: "01/11/2024",
			},
			{
				title: "Media Studies",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: [],
				materials: 44,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c82b3187-32a6-4982-9c58-9dd7ee7e2ffa",
				createdOn: "28/10/2024",
			},
			{
				title: "Art and Design",
				description:
					"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: [],
				materials: 32,
				quiz: 11,
				tags: [],
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
				chapters: [],
				materials: 25,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b1ae9dcb-1794-48de-aa2d-36127a680dac",
				createdOn: "21/09/2024",
			},
			{
				title: "Commerce",
				description:
					"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
				chapters: [],
				materials: 31,
				quiz: 14,
				tags: [],
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
				chapters: [],
				materials: 28,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "615d6836-db5b-438a-b6ed-064b568c6ac7",
				createdOn: "04/04/2024",
			},
			{
				title: "Spanish",
				description:
					"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
				chapters: [],
				materials: 37,
				quiz: 15,
				tags: [],
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
				chapters: [],
				materials: 47,
				quiz: 12,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b22551fc-74e7-4116-81e2-1536565fc0d8",
				createdOn: "07/08/2024",
			},
			{
				title: "Religious Studies",
				description:
					"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
				chapters: [],
				materials: 29,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9ed1ee1e-64f1-4457-a1a0-2a2048791178",
				createdOn: "24/04/2024",
			},
			{
				title: "Accounting",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
				chapters: [],
				materials: 40,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bd8ad0aa-d4b4-46e9-8001-7480bfb74649",
				createdOn: "26/08/2024",
			},
			{
				title: "Physics",
				description: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: [],
				materials: 36,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "73f8090a-e282-42b1-8fc4-89826fa146c6",
				createdOn: "20/07/2024",
			},
			{
				title: "Commerce",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
				chapters: [],
				materials: 50,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "c8291393-c1af-4119-ae71-894be85c88be",
				createdOn: "13/01/2024",
			},
			{
				title: "Mathematics",
				description:
					"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
				chapters: [
					{
						id: "1",
						title: "Algebraic Structures and Equations",
						description:
							"Advanced algebraic manipulation, solving complex equations, and understanding mathematical structures.",
						summary:
							"This chapter explores sophisticated algebraic techniques, including polynomial equations, system of equations, and advanced factorization methods.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "2",
						title: "Trigonometric Functions and Identities",
						description:
							"Comprehensive study of trigonometric functions, their properties, and advanced identities.",
						summary:
							"Students will master complex trigonometric manipulations, exploring sine, cosine, and tangent functions in depth.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "3",
						title: "Coordinate Geometry",
						description:
							"Advanced exploration of geometric concepts using coordinate systems and analytical approaches.",
						summary:
							"This chapter connects algebraic methods with geometric representations, introducing complex analytical techniques.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "4",
						title: "Calculus: Limits and Continuity",
						description:
							"Introduction to fundamental concepts of calculus, focusing on limits and function continuity.",
						summary:
							"Students will explore the mathematical foundations of change, understanding how functions behave at critical points.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "5",
						title: "Derivatives and Their Applications",
						description:
							"Advanced study of derivatives, including rate of change, optimization, and mathematical modeling.",
						summary:
							"This chapter demonstrates how derivatives can be used to solve real-world problems and understand function behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "6",
						title: "Integration Techniques",
						description:
							"Comprehensive exploration of integration methods and their practical applications.",
						summary:
							"Students will master various integration techniques, understanding how to calculate areas, volumes, and accumulated quantities.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "7",
						title: "Probability Theory",
						description:
							"Advanced probability concepts, including combinatorics, conditional probability, and statistical inference.",
						summary:
							"This chapter develops sophisticated understanding of randomness, chance, and mathematical prediction.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "8",
						title: "Matrices and Linear Transformations",
						description:
							"Deep dive into matrix algebra, linear transformations, and their applications in various fields.",
						summary:
							"Students will explore how matrices can represent complex mathematical transformations and solve systems of equations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "9",
						title: "Vectors in Three-Dimensional Space",
						description:
							"Advanced vector algebra, including dot and cross products, and three-dimensional geometric applications.",
						summary:
							"This chapter extends vector concepts to three-dimensional space, providing tools for complex spatial analysis.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "10",
						title: "Exponential and Logarithmic Functions",
						description:
							"Comprehensive study of exponential growth, logarithmic properties, and their real-world applications.",
						summary:
							"Students will explore the powerful mathematical behaviors of exponential and logarithmic functions.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "11",
						title: "Complex Numbers",
						description:
							"Advanced exploration of complex number systems, including algebraic and geometric interpretations.",
						summary:
							"This chapter introduces the mathematical world beyond real numbers, exploring complex number operations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "12",
						title: "Statistical Analysis",
						description:
							"Advanced statistical methods, including hypothesis testing, regression analysis, and data interpretation.",
						summary:
							"Students will develop sophisticated skills in analyzing and interpreting mathematical and statistical data.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "13",
						title: "Series and Sequences",
						description:
							"Comprehensive study of mathematical sequences, series, and their convergence properties.",
						summary:
							"This chapter explores the fascinating world of infinite sequences and their mathematical behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "14",
						title: "Analytical Geometry of Conic Sections",
						description:
							"Advanced study of circles, ellipses, parabolas, and hyperbolas using coordinate geometry.",
						summary:
							"Students will explore the mathematical properties of conic sections and their geometric representations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "15",
						title: "Mathematical Modeling",
						description:
							"Introduction to using mathematical techniques to model real-world phenomena and solve complex problems.",
						summary:
							"This chapter demonstrates how mathematical tools can be applied to understand and predict real-world systems.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
				],
				materials: 50,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a76d53cd-8631-4684-ad90-5d751face570",
				createdOn: "25/08/2024",
			},
			{
				title: "Accounting",
				description:
					"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: [],
				materials: 50,
				quiz: 11,
				tags: [],
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
				chapters: [],
				materials: 37,
				quiz: 11,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7cc1e34b-faf6-431a-9f26-f0503560ffe6",
				createdOn: "20/04/2024",
			},
			{
				title: "Music",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
				chapters: [],
				materials: 50,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9396dc4f-f4a9-488a-aa61-e5c7673cda2f",
				createdOn: "17/08/2024",
			},
			{
				title: "Philosophy",
				description:
					"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
				chapters: [],
				materials: 29,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "632ca3c8-4a78-44d8-a745-e88293d2a3ce",
				createdOn: "03/08/2024",
			},
			{
				title: "Sociology",
				description:
					"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
				chapters: [],
				materials: 38,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e3b0edf1-8ac9-44ad-aad3-d51cb8f9a337",
				createdOn: "03/10/2024",
			},
			{
				title: "Archaeology",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
				chapters: [],
				materials: 38,
				quiz: 12,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "37f06314-6ee6-4a8e-80eb-0463f3ddbeb0",
				createdOn: "06/11/2024",
			},
			{
				title: "English Literature",
				description:
					"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
				chapters: [],
				materials: 31,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1cf231a8-19db-4b40-93dd-c959921e5613",
				createdOn: "02/05/2024",
			},
			{
				title: "Arabic",
				description:
					"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
				chapters: [],
				materials: 39,
				quiz: 13,
				tags: [],
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
				chapters: [],
				materials: 49,
				quiz: 15,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "b104d21e-5b47-4184-b45f-b9a48b96755d",
				createdOn: "28/02/2024",
			},
			{
				title: "German",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: [],
				materials: 50,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "67663b27-9636-421b-b469-2e04059ed665",
				createdOn: "26/06/2024",
			},
			{
				title: "English Literature",
				description:
					"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
				chapters: [],
				materials: 37,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6af7f554-5d01-423d-9a3b-e3b947b10330",
				createdOn: "05/05/2024",
			},
			{
				title: "Geography",
				description:
					"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: [],
				materials: 25,
				quiz: 14,
				tags: [],
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
				chapters: [],
				materials: 37,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "5d148704-6787-438a-b2bf-b674118fec85",
				createdOn: "24/01/2024",
			},
			{
				title: "Commerce",
				description:
					"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: [],
				materials: 41,
				quiz: 19,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6cc8be1f-a843-44eb-b9fc-fe9d1c169897",
				createdOn: "29/09/2024",
			},
			{
				title: "Computer Studies",
				description:
					"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
				chapters: [],
				materials: 33,
				quiz: 10,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "7a0668d6-bc93-47b6-b3f6-5d8e5b6fde4f",
				createdOn: "17/01/2024",
			},
			{
				title: "Mathematics",
				description:
					"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
				chapters: [
					{
						id: "1",
						title: "Algebraic Structures and Equations",
						description:
							"Advanced algebraic manipulation, solving complex equations, and understanding mathematical structures.",
						summary:
							"This chapter explores sophisticated algebraic techniques, including polynomial equations, system of equations, and advanced factorization methods.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "2",
						title: "Trigonometric Functions and Identities",
						description:
							"Comprehensive study of trigonometric functions, their properties, and advanced identities.",
						summary:
							"Students will master complex trigonometric manipulations, exploring sine, cosine, and tangent functions in depth.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "3",
						title: "Coordinate Geometry",
						description:
							"Advanced exploration of geometric concepts using coordinate systems and analytical approaches.",
						summary:
							"This chapter connects algebraic methods with geometric representations, introducing complex analytical techniques.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "4",
						title: "Calculus: Limits and Continuity",
						description:
							"Introduction to fundamental concepts of calculus, focusing on limits and function continuity.",
						summary:
							"Students will explore the mathematical foundations of change, understanding how functions behave at critical points.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "5",
						title: "Derivatives and Their Applications",
						description:
							"Advanced study of derivatives, including rate of change, optimization, and mathematical modeling.",
						summary:
							"This chapter demonstrates how derivatives can be used to solve real-world problems and understand function behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "6",
						title: "Integration Techniques",
						description:
							"Comprehensive exploration of integration methods and their practical applications.",
						summary:
							"Students will master various integration techniques, understanding how to calculate areas, volumes, and accumulated quantities.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "7",
						title: "Probability Theory",
						description:
							"Advanced probability concepts, including combinatorics, conditional probability, and statistical inference.",
						summary:
							"This chapter develops sophisticated understanding of randomness, chance, and mathematical prediction.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "8",
						title: "Matrices and Linear Transformations",
						description:
							"Deep dive into matrix algebra, linear transformations, and their applications in various fields.",
						summary:
							"Students will explore how matrices can represent complex mathematical transformations and solve systems of equations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "9",
						title: "Vectors in Three-Dimensional Space",
						description:
							"Advanced vector algebra, including dot and cross products, and three-dimensional geometric applications.",
						summary:
							"This chapter extends vector concepts to three-dimensional space, providing tools for complex spatial analysis.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "10",
						title: "Exponential and Logarithmic Functions",
						description:
							"Comprehensive study of exponential growth, logarithmic properties, and their real-world applications.",
						summary:
							"Students will explore the powerful mathematical behaviors of exponential and logarithmic functions.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "11",
						title: "Complex Numbers",
						description:
							"Advanced exploration of complex number systems, including algebraic and geometric interpretations.",
						summary:
							"This chapter introduces the mathematical world beyond real numbers, exploring complex number operations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "12",
						title: "Statistical Analysis",
						description:
							"Advanced statistical methods, including hypothesis testing, regression analysis, and data interpretation.",
						summary:
							"Students will develop sophisticated skills in analyzing and interpreting mathematical and statistical data.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "13",
						title: "Series and Sequences",
						description:
							"Comprehensive study of mathematical sequences, series, and their convergence properties.",
						summary:
							"This chapter explores the fascinating world of infinite sequences and their mathematical behaviors.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "14",
						title: "Analytical Geometry of Conic Sections",
						description:
							"Advanced study of circles, ellipses, parabolas, and hyperbolas using coordinate geometry.",
						summary:
							"Students will explore the mathematical properties of conic sections and their geometric representations.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
					{
						id: "15",
						title: "Mathematical Modeling",
						description:
							"Introduction to using mathematical techniques to model real-world phenomena and solve complex problems.",
						summary:
							"This chapter demonstrates how mathematical tools can be applied to understand and predict real-world systems.",
						transcript: [],
						quizzes: [],
						resources: [],
						isRead: true,
					},
				],
				materials: 34,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "27a266be-f3b0-44b2-80b4-c89e8c6fa438",
				createdOn: "28/12/2023",
			},
			{
				title: "Spanish",
				description:
					"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
				chapters: [],
				materials: 31,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "e9940723-dc6d-474a-9775-3e16678f7511",
				createdOn: "09/06/2024",
			},
			{
				title: "Business Studies",
				description:
					"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
				chapters: [],
				materials: 42,
				quiz: 20,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "0378a68c-8c3c-49af-876e-e35adc90941a",
				createdOn: "17/02/2024",
			},
			{
				title: "English Literature",
				description:
					"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
				chapters: [],
				materials: 43,
				quiz: 13,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "8d7d5cef-9f85-4050-b216-6b76adc9eb2d",
				createdOn: "13/08/2024",
			},
			{
				title: "Spanish",
				description:
					"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
				chapters: [],
				materials: 26,
				quiz: 14,
				tags: [],
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
				chapters: [],
				materials: 25,
				quiz: 10,
				tags: [],
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
				chapters: [],
				materials: 30,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "903f0c6c-929b-453b-aa17-dd45fac401be",
				createdOn: "03/01/2024",
			},
			{
				title: "Home Economics",
				description:
					"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
				chapters: [],
				materials: 41,
				quiz: 17,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "6afdbc81-0aae-4db3-abf2-5419a5f95108",
				createdOn: "17/12/2023",
			},
			{
				title: "Additional Mathematics",
				description:
					"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
				chapters: [],
				materials: 33,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "bca1a927-869e-48ea-9d12-bbcc3c0e6401",
				createdOn: "07/04/2024",
			},
			{
				title: "English Language",
				description:
					"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
				chapters: [],
				materials: 46,
				quiz: 11,
				tags: [],
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
				chapters: [],
				materials: 26,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "9a3561ee-69e2-4437-9edc-5f2251716b06",
				createdOn: "28/11/2023",
			},
			{
				title: "English Literature",
				description:
					"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
				chapters: [],
				materials: 36,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "a5a93d07-32dd-4de8-a34e-3f4c781d74d9",
				createdOn: "08/06/2024",
			},
			{
				title: "Art and Design",
				description:
					"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
				chapters: [],
				materials: 47,
				quiz: 14,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "1aa2b894-334e-4d47-85fa-854076b4c167",
				createdOn: "07/06/2024",
			},
			{
				title: "Philosophy",
				description:
					"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
				chapters: [],
				materials: 31,
				quiz: 18,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "dd78746a-26d6-4f38-b58e-dc148b5b3626",
				createdOn: "17/01/2024",
			},
			{
				title: "Additional Mathematics",
				description:
					"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
				chapters: [],
				materials: 44,
				quiz: 16,
				tags: [],
				image:
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				id: "45a36ee6-cde9-4678-8e6c-f834d5b6bcd6",
				createdOn: "09/03/2024",
			},
		],
	},
]

export const community: CommunityProps = {
	id: "comm_jamb_prep_2024",
	name: "JAMB Prep Forum",
	description: "Comprehensive preparation platform for JAMB candidates",
	admins: ["user_admin_1"],
	members: [
		{
			id: "1",
			first_name: "Emma",
			last_name: "Rodriguez",
			email: "emma.rodriguez@example.com",
			image: "https://randomuser.me/api/portraits/women/1.jpg",
			password: "hashedPassword1",
			access_token: "token1",
			referral_code: "EMMA2024",
			profile_image: "https://randomuser.me/api/portraits/women/1.jpg",
			is_verified: true,
			chosen_study_plan: false,
			user_type: "student",
			wallet_id: "wallet_emma_1",
			sign_up_channel: "email",
			isBlocked: false,
			createdOn: new Date("2024-01-15T10:30:00Z"),
		},
		{
			id: "2",
			first_name: "Liam",
			last_name: "Chen",
			email: "liam.chen@example.com",
			image: "https://randomuser.me/api/portraits/men/2.jpg",
			password: "hashedPassword2",
			access_token: "token2",
			referral_code: "LIAM2024",
			profile_image: "https://randomuser.me/api/portraits/men/2.jpg",
			is_verified: false,
			chosen_study_plan: true,
			user_type: "professional",
			wallet_id: "wallet_liam_2",
			sign_up_channel: "google",
			isBlocked: false,
			createdOn: new Date("2024-02-20T14:45:00Z"),
		},
		{
			id: "3",
			first_name: "Sophia",
			last_name: "Patel",
			email: "sophia.patel@example.com",
			image: "https://randomuser.me/api/portraits/women/3.jpg",
			password: "hashedPassword3",
			access_token: "token3",
			referral_code: "SOPHIA2024",
			profile_image: "https://randomuser.me/api/portraits/women/3.jpg",
			is_verified: true,
			chosen_study_plan: true,
			user_type: "admin",
			wallet_id: "wallet_sophia_3",
			sign_up_channel: "facebook",
			isBlocked: false,
			createdOn: new Date("2024-03-10T09:15:00Z"),
		},
		{
			id: "4",
			first_name: "Noah",
			last_name: "Williams",
			email: "noah.williams@example.com",
			image: "https://randomuser.me/api/portraits/men/4.jpg",
			password: "hashedPassword4",
			access_token: "token4",
			referral_code: "NOAH2024",
			profile_image: "https://randomuser.me/api/portraits/men/4.jpg",
			is_verified: false,
			chosen_study_plan: false,
			user_type: "student",
			wallet_id: "wallet_noah_4",
			sign_up_channel: "apple",
			isBlocked: true,
			createdOn: new Date("2024-04-05T16:20:00Z"),
		},
		{
			id: "5",
			first_name: "Olivia",
			last_name: "Martinez",
			email: "olivia.martinez@example.com",
			image: "https://randomuser.me/api/portraits/women/5.jpg",
			password: "hashedPassword5",
			access_token: "token5",
			referral_code: "OLIVIA2024",
			profile_image: "https://randomuser.me/api/portraits/women/5.jpg",
			is_verified: true,
			chosen_study_plan: true,
			user_type: "professional",
			wallet_id: "wallet_olivia_5",
			sign_up_channel: "email",
			isBlocked: false,
			createdOn: new Date("2024-05-12T11:40:00Z"),
		},
		{
			id: "6",
			first_name: "Ethan",
			last_name: "Kim",
			email: "ethan.kim@example.com",
			image: "https://randomuser.me/api/portraits/men/6.jpg",
			password: "hashedPassword6",
			access_token: "token6",
			referral_code: "ETHAN2024",
			profile_image: "https://randomuser.me/api/portraits/men/6.jpg",
			is_verified: false,
			chosen_study_plan: false,
			user_type: "student",
			wallet_id: "wallet_ethan_6",
			sign_up_channel: "google",
			isBlocked: false,
			createdOn: new Date("2024-06-18T13:55:00Z"),
		},
		{
			id: "7",
			first_name: "Ava",
			last_name: "Nguyen",
			email: "ava.nguyen@example.com",
			image: "https://randomuser.me/api/portraits/women/7.jpg",
			password: "hashedPassword7",
			access_token: "token7",
			referral_code: "AVA2024",
			profile_image: "https://randomuser.me/api/portraits/women/7.jpg",
			is_verified: true,
			chosen_study_plan: true,
			user_type: "admin",
			wallet_id: "wallet_ava_7",
			sign_up_channel: "facebook",
			isBlocked: false,
			createdOn: new Date("2024-07-22T08:25:00Z"),
		},
		{
			id: "8",
			first_name: "Mason",
			last_name: "Garcia",
			email: "mason.garcia@example.com",
			image: "https://randomuser.me/api/portraits/men/8.jpg",
			password: "hashedPassword8",
			access_token: "token8",
			referral_code: "MASON2024",
			profile_image: "https://randomuser.me/api/portraits/men/8.jpg",
			is_verified: false,
			chosen_study_plan: true,
			user_type: "professional",
			wallet_id: "wallet_mason_8",
			sign_up_channel: "apple",
			isBlocked: true,
			createdOn: new Date("2024-08-30T15:10:00Z"),
		},
		{
			id: "9",
			first_name: "Isabella",
			last_name: "Lee",
			email: "isabella.lee@example.com",
			image: "https://randomuser.me/api/portraits/women/9.jpg",
			password: "hashedPassword9",
			access_token: "token9",
			referral_code: "ISABELLA2024",
			profile_image: "https://randomuser.me/api/portraits/women/9.jpg",
			is_verified: true,
			chosen_study_plan: false,
			user_type: "student",
			wallet_id: "wallet_isabella_9",
			sign_up_channel: "email",
			isBlocked: false,
			createdOn: new Date("2024-09-05T12:35:00Z"),
		},
		{
			id: "10",
			first_name: "Lucas",
			last_name: "Singh",
			email: "lucas.singh@example.com",
			image: "https://randomuser.me/api/portraits/men/10.jpg",
			password: "hashedPassword10",
			access_token: "token10",
			referral_code: "LUCAS2024",
			profile_image: "https://randomuser.me/api/portraits/men/10.jpg",
			is_verified: false,
			chosen_study_plan: true,
			user_type: "professional",
			wallet_id: "wallet_lucas_10",
			sign_up_channel: "google",
			isBlocked: false,
			createdOn: new Date("2024-10-14T17:50:00Z"),
		},
	],
	channels: [
		{
			id: "chan_general",
			name: "General",
			type: "text",
			description: "General channel for JAMB students",
			locked: false,
			color: "#9A348E",
			isGeneral: true,
			participants: [],
			messages: [
				{
					id: "msg_general_1",
					userId: "system",
					content: "Welcome to the general JAMB channel!",
					type: "text",
					timestamp: Date.now(),
				},
			],
		},
		{
			id: "chan_maths",
			name: "Maths",
			type: "text",
			description: "Mathematics discussion and problem-solving",
			locked: false,
			color: "#FCA17D",
			participants: [],
			messages: [
				{
					id: "msg_casual_1",
					userId: "system",
					content: "Welcome to the Friends Chat! 😊 Feel free to share and chat!",
					type: "text",
					timestamp: 1701638400000,
				},
				{
					id: "msg_casual_2",
					userId: "amina",
					content: "Hey everyone! How's your day going?",
					type: "text",
					timestamp: 1701638460000,
				},
				{
					id: "msg_casual_3",
					userId: "john",
					content: "Pretty good! Just finished my morning coffee. How about you?",
					type: "text",
					timestamp: 1701638520000,
				},
				{
					id: "msg_casual_4",
					userId: "amina",
					content: "Just woke up and feeling a bit lazy. Thinking of skipping breakfast 😴",
					type: "text",
					timestamp: 1701638580000,
				},
				{
					id: "msg_casual_5",
					userId: "sarah",
					content: "No way! Breakfast is the most important meal of the day 🍳",
					type: "text",
					timestamp: 1701638640000,
				},
				{
					id: "msg_casual_6",
					userId: "amina",
					content: "Ugh, you sound like my mom! 😂 What are you all up to today?",
					type: "text",
					timestamp: 1701638700000,
				},
				{
					id: "msg_casual_7",
					userId: "john",
					content: "Planning to watch the big game later. Anyone want to join?",
					type: "text",
					timestamp: 1701638760000,
				},
				{
					id: "msg_casual_8",
					userId: "sarah",
					content: "Can't today. I've got a study group in the afternoon.",
					type: "text",
					timestamp: 1701638820000,
				},
				{
					id: "msg_casual_9",
					userId: "amina",
					content: "What are you studying?",
					type: "text",
					timestamp: 1701638880000,
				},
				{
					id: "msg_casual_10",
					userId: "sarah",
					content: "Getting ready for some exams. Lots of reading to do!",
					type: "text",
					timestamp: 1701638940000,
				},
				{
					id: "msg_casual_11",
					userId: "john",
					content: "Sounds tough. Need any help?",
					type: "text",
					timestamp: 1701639000000,
				},
				{
					id: "msg_casual_12",
					userId: "sarah",
					content: "Thanks, I'm good. Just need to focus and stay motivated.",
					type: "text",
					timestamp: 1701639060000,
				},
				{
					id: "msg_casual_13",
					userId: "amina",
					content: "Anyone want to grab lunch this weekend?",
					type: "text",
					timestamp: 1701639120000,
				},
				{
					id: "msg_casual_14",
					userId: "john",
					content: "Count me in! That new burger place sounds good.",
					type: "text",
					timestamp: 1701639180000,
				},
				{
					id: "msg_casual_15",
					userId: "sarah",
					content: "I might be free on Saturday. Let me check my schedule.",
					type: "text",
					timestamp: 1701639240000,
				},
				{
					id: "msg_casual_16",
					userId: "amina",
					content: "Great! We'll make a group plan later.",
					type: "text",
					timestamp: 1701639300000,
				},
				{
					id: "msg_casual_17",
					userId: "john",
					content: "The weather's been amazing lately, right?",
					type: "text",
					timestamp: 1701639360000,
				},
				{
					id: "msg_casual_18",
					userId: "sarah",
					content: "Perfect for outdoor activities! I've been enjoying my morning walks.",
					type: "text",
					timestamp: 1701639420000,
				},
				{
					id: "msg_casual_19",
					userId: "amina",
					content: "I need to start exercising more. Any tips?",
					type: "text",
					timestamp: 1701639480000,
				},
				{
					id: "msg_casual_20",
					userId: "john",
					content: "Start small! Even a 15-minute walk is better than nothing.",
					type: "text",
					timestamp: 1701639540000,
				},
			],
		},
		{
			id: "chan_english",
			name: "English",
			type: "text",
			description: "English language and comprehension",
			locked: false,
			color: "#FF7733",
			participants: [],
			messages: [
				{
					id: "msg_english_1",
					userId: "system",
					content: "English language tips and practice",
					type: "text",
					timestamp: Date.now(),
				},
			],
		},
		{
			id: "chan_chemistry",
			name: "Chemistry",
			type: "text",
			description: "Chemistry study group and problem-solving",
			locked: false,
			color: "#28464B",
			participants: [],
			messages: [
				{
					id: "msg_chem_1",
					userId: "system",
					content: "Chemistry channel for JAMB preparation",
					type: "text",
					timestamp: Date.now(),
				},
			],
		},
		{
			id: "chan_physics",
			name: "Physics",
			type: "text",
			description: "Physics discussions and exam preparation",
			locked: false,
			color: "#42D9C8",
			participants: [],
			messages: [
				{
					id: "msg_physics_1",
					userId: "system",
					content:
						"Welcome to the JAMB Physics Preparation Channel! 🚀 Let's explore physics together and help each other prepare for the exam.",
					type: "text",
					timestamp: 1701638400000,
				},
				{
					id: "msg_physics_2",
					userId: "system",
					content:
						"Today's topic: Mechanics and Newton's Laws of Motion. Feel free to ask questions, share insights, and learn together!",
					type: "text",
					timestamp: 1701638460000,
				},
				{
					id: "msg_physics_3",
					userId: "samiat",
					content: "Hi everyone! Can someone explain Newton's First Law of Motion in simple terms?",
					type: "text",
					timestamp: 1701638520000,
				},
				{
					id: "msg_physics_4",
					userId: "michael",
					content:
						"Sure, Samiat! Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force. Basically, things won't change their motion without a reason.",
					type: "text",
					timestamp: 1701638580000,
				},
				{
					id: "msg_physics_5",
					userId: "samiat",
					content: "Can you give a real-world example to help me understand?",
					type: "text",
					timestamp: 1701638640000,
				},
				{
					id: "msg_physics_6",
					userId: "michael",
					content:
						"Think about a book on a table. It stays still until you push or pull it. Or imagine a passenger in a car - when the car suddenly stops, the passenger tends to move forward. That's inertia in action!",
					type: "text",
					timestamp: 1701638700000,
				},
				{
					id: "msg_physics_7",
					userId: "soolay",
					content:
						"I'm struggling with calculating force. How do you determine the net force on an object?",
					type: "text",
					timestamp: 1701638760000,
				},
				{
					id: "msg_physics_8",
					userId: "michael",
					content:
						"Net force is the vector sum of all forces acting on an object. You calculate it by adding up forces in their respective directions. If forces are in opposite directions, you subtract them.",
					type: "text",
					timestamp: 1701638820000,
				},
				{
					id: "msg_physics_9",
					userId: "soolay",
					content: "Can you walk me through an example?",
					type: "text",
					timestamp: 1701638880000,
				},
				{
					id: "msg_physics_10",
					userId: "michael",
					content:
						"Sure! Let's say you have a 10N force pushing right and a 6N force pushing left. The net force would be 4N to the right (10N - 6N = 4N).",
					type: "text",
					timestamp: 1701638940000,
				},
				{
					id: "msg_physics_11",
					userId: "you",
					content: "What's the difference between mass and weight? I always get confused.",
					type: "text",
					timestamp: 1701639000000,
				},
				{
					id: "msg_physics_12",
					userId: "michael",
					content:
						"Great question! Mass is the amount of matter in an object and stays constant everywhere. Weight is the force of gravity on that mass, so it changes depending on location. On the moon, you'd weigh less, but your mass remains the same.",
					type: "text",
					timestamp: 1701639060000,
				},
				{
					id: "msg_physics_13",
					userId: "soolay",
					content: "How do we calculate weight mathematically?",
					type: "text",
					timestamp: 1701639120000,
				},
				{
					id: "msg_physics_14",
					userId: "you",
					content:
						"Weight = mass × gravitational acceleration. On Earth, g ≈ 9.8 m/s². So if you have a 50 kg mass, its weight would be 50 kg × 9.8 m/s² = 490 N.",
					type: "text",
					timestamp: 1701639180000,
				},
				{
					id: "msg_physics_15",
					userId: "samiat",
					content: "Are there any tricks for remembering Newton's Second Law?",
					type: "text",
					timestamp: 1701639240000,
				},
				{
					id: "msg_physics_16",
					userId: "michael",
					content:
						"Newton's Second Law is F = ma. Remember: Force equals mass times acceleration. The more mass an object has, the more force needed to accelerate it.",
					type: "text",
					timestamp: 1701639300000,
				},
				{
					id: "msg_physics_17",
					userId: "soolay",
					content: "What topics should we focus on most for the JAMB physics exam?",
					type: "text",
					timestamp: 1701639360000,
				},
				{
					id: "msg_physics_18",
					userId: "you",
					content:
						"Key topics for JAMB Physics include: Mechanics, Waves, Electricity, Magnetism, Heat, and Modern Physics. Focus on understanding fundamental concepts and problem-solving.",
					type: "text",
					timestamp: 1701639420000,
				},
				{
					id: "msg_physics_19",
					userId: "samiat",
					content: "Do you recommend any study resources for JAMB physics preparation?",
					type: "text",
					timestamp: 1701639480000,
				},
				{
					id: "msg_physics_20",
					userId: "michael",
					content:
						"I suggest using past JAMB questions, JAMB physics textbooks, and online resources like Khan Academy. Practice is key! Make sure to solve lots of problems and understand the underlying concepts.",
					type: "text",
					timestamp: 1701639540000,
				},
			],
		},
		{
			id: "chan_biology",
			name: "Biology",
			type: "text",
			description: "Biology discussions and exam preparation",
			locked: true,
			color: "#D183C9",
			participants: [],
			messages: [],
		},
		{
			id: "chan_government",
			name: "Government",
			type: "text",
			description: "Government discussions and exam preparation",
			locked: true,
			color: "#685F74",
			participants: [],
			messages: [],
		},
		{
			id: "chan_history",
			name: "History",
			type: "text",
			description: "History discussions and exam preparation",
			locked: true,
			color: "#361134",
			participants: [],
			messages: [],
		},
		{
			id: "chan_geography",
			name: "Geography",
			type: "text",
			description: "Geography discussions and exam preparation",
			locked: true,
			color: "#E56B70",
			participants: [],
			messages: [],
		},
		{
			id: "chan_literature",
			name: "Literature",
			type: "text",
			description: "Literature discussions and exam preparation",
			locked: true,
			color: "#45CB85",
			participants: [],
			messages: [],
		},
		{
			id: "chan_agric",
			name: "Agricultural Science",
			type: "text",
			description: "Agricultural Science discussions and exam preparation",
			locked: true,
			color: "#3B60E4",
			participants: [],
			messages: [],
		},
		{
			id: "chan_french",
			name: "French",
			type: "text",
			description: "French discussions and exam preparation",
			locked: true,
			color: "#FFC43D",
			participants: [],
			messages: [],
		},
	],
}

export const leaderboard: LeaderboardProps[] = [
	{
		id: "1",
		createdOn: "2024-04-09T07:37:23Z",
		quiz: 1246,
		referrals: 19,
		streak: 9,
		userId: "qkeerl0",
	},
	{
		id: "2",
		createdOn: "2024-08-14T11:57:41Z",
		quiz: 4507,
		referrals: 97,
		streak: 2,
		userId: "neldredge1",
	},
	{
		id: "3",
		createdOn: "2024-09-21T18:40:48Z",
		quiz: 727,
		referrals: 58,
		streak: 4,
		userId: "ppridding2",
	},
	{
		id: "4",
		createdOn: "2024-02-03T01:55:19Z",
		quiz: 2811,
		referrals: 88,
		streak: 9,
		userId: "edulwich3",
	},
	{
		id: "5",
		createdOn: "2024-02-23T05:58:00Z",
		quiz: 1198,
		referrals: 55,
		streak: 20,
		userId: "bhughf4",
	},
	{
		id: "6",
		createdOn: "2024-09-08T11:42:22Z",
		quiz: 1422,
		referrals: 21,
		streak: 1,
		userId: "smcginny5",
	},
	{
		id: "7",
		createdOn: "2024-11-05T07:33:43Z",
		quiz: 4844,
		referrals: 76,
		streak: 13,
		userId: "bcodman6",
	},
	{
		id: "8",
		createdOn: "2024-03-24T07:43:19Z",
		quiz: 2628,
		referrals: 8,
		streak: 7,
		userId: "fbraferton7",
	},
	{
		id: "9",
		createdOn: "2024-06-05T13:56:46Z",
		quiz: 2466,
		referrals: 19,
		streak: 19,
		userId: "rganley8",
	},
	{
		id: "10",
		createdOn: "2024-09-21T12:13:29Z",
		quiz: 2470,
		referrals: 89,
		streak: 27,
		userId: "dorwell9",
	},
	{
		id: "11",
		createdOn: "2024-07-30T05:59:58Z",
		quiz: 4051,
		referrals: 34,
		streak: 30,
		userId: "bfosserda",
	},
	{
		id: "12",
		createdOn: "2024-08-27T02:33:39Z",
		quiz: 1348,
		referrals: 48,
		streak: 6,
		userId: "ndrysdaleb",
	},
	{
		id: "13",
		createdOn: "2024-03-06T13:16:32Z",
		quiz: 1242,
		referrals: 60,
		streak: 5,
		userId: "cdeussc",
	},
	{
		id: "14",
		createdOn: "2024-04-22T23:37:17Z",
		quiz: 1911,
		referrals: 82,
		streak: 29,
		userId: "hdaingerfieldd",
	},
	{
		id: "15",
		createdOn: "2023-12-04T11:50:56Z",
		quiz: 2337,
		referrals: 59,
		streak: 5,
		userId: "lkleine",
	},
	{
		id: "16",
		createdOn: "2024-07-15T10:53:15Z",
		quiz: 3953,
		referrals: 89,
		streak: 2,
		userId: "tmatityahuf",
	},
	{
		id: "17",
		createdOn: "2024-04-17T11:42:05Z",
		quiz: 1918,
		referrals: 37,
		streak: 32,
		userId: "ktetfordg",
	},
	{
		id: "18",
		createdOn: "2023-12-08T12:29:24Z",
		quiz: 1140,
		referrals: 33,
		streak: 15,
		userId: "rgoodbarrh",
	},
	{
		id: "19",
		createdOn: "2024-08-21T09:49:59Z",
		quiz: 949,
		referrals: 76,
		streak: 12,
		userId: "gbarracloughi",
	},
	{
		id: "20",
		createdOn: "2024-08-23T00:23:45Z",
		quiz: 3707,
		referrals: 12,
		streak: 22,
		userId: "eashmolej",
	},
	{
		id: "21",
		createdOn: "2024-11-02T11:32:28Z",
		quiz: 1970,
		referrals: 73,
		streak: 3,
		userId: "kgarredk",
	},
	{
		id: "22",
		createdOn: "2024-01-03T20:32:47Z",
		quiz: 4868,
		referrals: 20,
		streak: 21,
		userId: "sharbarl",
	},
	{
		id: "23",
		createdOn: "2024-10-11T08:26:06Z",
		quiz: 3259,
		referrals: 10,
		streak: 2,
		userId: "tbunnellm",
	},
	{
		id: "24",
		createdOn: "2024-03-09T15:30:05Z",
		quiz: 4989,
		referrals: 44,
		streak: 7,
		userId: "tjiggensn",
	},
	{
		id: "25",
		createdOn: "2024-02-14T10:36:37Z",
		quiz: 1809,
		referrals: 81,
		streak: 14,
		userId: "gdonneelyo",
	},
	{
		id: "26",
		createdOn: "2024-02-03T16:42:01Z",
		quiz: 3640,
		referrals: 62,
		streak: 25,
		userId: "hshiltonp",
	},
	{
		id: "27",
		createdOn: "2024-10-11T23:15:09Z",
		quiz: 4416,
		referrals: 75,
		streak: 8,
		userId: "nedlerq",
	},
	{
		id: "28",
		createdOn: "2024-09-08T14:26:48Z",
		quiz: 547,
		referrals: 100,
		streak: 18,
		userId: "fvannarr",
	},
	{
		id: "29",
		createdOn: "2024-03-22T01:13:08Z",
		quiz: 4385,
		referrals: 22,
		streak: 19,
		userId: "llilleymans",
	},
	{
		id: "30",
		createdOn: "2024-06-12T01:32:18Z",
		quiz: 1752,
		referrals: 91,
		streak: 20,
		userId: "mwoolhamt",
	},
]

export const events: EventProps[] = [
	{
		id: "event-001",
		date: ["2024-12-03"],
		title: "Winter Tech Conference Opening",
		participants: ["Emily Chang", "Sundar Pichai", "Satya Nadella"],
	},
	{
		id: "event-002",
		date: ["2024-12-15", "2024-12-16"],
		title: "Holiday Hackathon",
		participants: ["Linus Torvalds", "Ada Lovelace", "Grace Hopper"],
	},
	{
		id: "event-003",
		date: ["2024-12-31"],
		title: "New Year's Tech Celebration",
		participants: ["Marc Andreessen", "Reid Hoffman", "Bill Gates"],
	},
	{
		id: "event-004",
		date: ["2025-01-10"],
		title: "GTC Annual Crusade",
		participants: ["Jensen Huang", "Lisa Su", "Pat Gelsinger"],
	},
	{
		id: "event-005",
		date: ["2025-01-20", "2025-01-21"],
		title: "Virtual Innovation Summit",
		participants: ["Elon Musk", "Jack Dorsey", "Sheryl Sandberg"],
	},
	{
		id: "event-006",
		date: ["2025-01-31"],
		title: "End of Month Tech Retrospective",
		participants: ["Tim Cook", "Satya Nadella", "Sundar Pichai"],
	},
	{
		id: "event-007",
		date: [new Date().toString()],
		title: "Test Event",
		participants: ["Tim Cook", "Satya Nadella", "Sundar Pichai"],
	},
]

export const notifications: NotificationProps[] = [
	{
		id: "not-001",
		title: "New Message",
		content: "You have a new direct message from John",
		read: false,
		createdOn: "2024-03-15T10:30:00Z",
	},
	{
		id: "not-002",
		title: "Friend Request",
		content: "Sarah has sent you a friend request",
		read: false,
		createdOn: "2024-03-15T14:45:22Z",
	},
	{
		id: "not-003",
		title: "System Update",
		content: "A new version of the app is now available",
		read: true,
		createdOn: "2024-03-14T09:15:10Z",
	},
	{
		id: "not-004",
		title: "Event Reminder",
		content: "Team meeting starts in 30 minutes",
		read: false,
		createdOn: "2024-03-15T16:20:35Z",
	},
]

export const timeChart: UserChartProps[] = [
	{ date: "Monday", time_spent: 7400 },
	{ date: "Tuesday", time_spent: 7200 },
	{ date: "Wednesday", time_spent: 2700 },
	{ date: "Thursday", time_spent: 13500 },
	{ date: "Friday", time_spent: 5400 },
	{ date: "Saturday", time_spent: 6300 },
	{ date: "Sunday", time_spent: 6300 },
]
