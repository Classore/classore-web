import { Footer, Navbar, Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Privacy Policy" />

			<Navbar />

			<main className="scrollbar w-full font-geist">
				<article className="container flex flex-col gap-10 px-3 py-20 text-sm text-neutral-600 md:text-base lg:px-0">
					<header className="space-y-2 pt-20 text-center">
						<h2 className="text-3xl font-black text-neutral-900 lg:text-5xl">Privacy Policy</h2>
						<p className="text-xs uppercase text-neutral-400">Effective from: 28th February 2025.</p>
					</header>

					<p>
						CLASSORE is committed to protecting the privacy of our users, including students, instructors,
						and other visitors to our website and mobile application. This Privacy Policy explains how we
						collect, use, disclose, and protect personal information and other data when you use our
						platform.
					</p>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">1. Information We Collect</h3>
						<p>We collect the following types of information to provide and improve our services:</p>

						<ul className="list-inside list-disc pl-5">
							<li>
								Personal Information - ⁠Name, email address, password, and other identifying details.
							</li>
							<li>
								Payment Information - ⁠Credit/debit card details for subscription payments and automatic
								renewals to prevent service interruptions.
							</li>
							<li>
								Course and Test Data - ⁠User progress, test scores, and other data associated with courses
								and tests.
							</li>
							<li>
								Device and Browser Information - ⁠IP address, device type, browser type, and other technical
								details for security and optimization purposes.
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">2. ⁠How We Use Your Information</h3>
						<p>We use collected information to:</p>

						<ul className="list-inside list-disc pl-5">
							<li>⁠Provide and improve our educational services.</li>
							<li>Process payments and ensure uninterrupted access to our platform.</li>
							<li>Personalize your learning experience.</li>
							<li>Communicate with you regarding your courses, tests, and platform updates.</li>
							<li>Analyze usage trends and enhance our platform.</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">3. ⁠Sharing of Information</h3>
						<p>CLASSORE values your privacy and limits data sharing as follows:</p>

						<ul className="list-inside list-disc pl-5">
							<li>
								⁠No Sharing of Personal Information for Marketing - We do not share personal information,
								including card details, with third parties for marketing purposes.
							</li>
							<li>
								Aggregated, Anonymized Data - We may share anonymized, non-identifiable data with partners
								and researchers for analysis and service improvements.
							</li>
							<li>
								Legal and Security Obligations - We may disclose personal information in response to legal
								requests, law enforcement, or to protect CLASSORE’s rights and users.
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">4. Security Measures</h3>
						<p>We take data security seriously and implement the following measures:</p>

						<ul className="list-inside list-disc pl-5">
							<li>⁠Industry-standard encryption to protect sensitive data.</li>
							<li>⁠Regular system updates and security patches to prevent vulnerabilities.</li>
							<li>Strict access controls to safeguard user information.</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">5. Your Rights</h3>
						<p>You have the right to:</p>

						<ul className="list-inside list-disc pl-5">
							<li>⁠Access and update your personal information.</li>
							<li>⁠⁠Modify or remove your payment details.</li>
							<li>Request deletion of your account and associated data.</li>
							<li>Opt-out of certain communications and data collection practices.</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">6. Changes to this Privacy Policy</h3>
						<p>
							CLASSORE reserves the right to update this Privacy Policy from time to time. Any changes will
							be:
						</p>

						<ul className="list-inside list-disc pl-5">
							<li>⁠Posted on our website and mobile application.</li>
							<li>⁠Effective from the date specified in the updated policy.</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-semibold text-neutral-700">7. ⁠Contact Us</h3>
						<p>
							For any questions or concerns regarding this Privacy Policy, please contact us at:{" "}
							<a className="text-primary-300 hover:underline" href="mailto:assist@classore.com">
								assist@classore.com
							</a>
						</p>
					</div>
				</article>
			</main>

			<Footer />
		</>
	);
};

export default Page;
