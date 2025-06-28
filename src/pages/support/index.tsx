import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";

import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Navbar, Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
	name: z.string().min(1, "Please enter your full name."),
	email: z.string().email("Please provide a valid email address."),
	phoneNumber: z.string().min(1, "Please enter your phone number so we can contact you."),
	platform: z.string().min(1, "Please specify the platform you are experiencing issues with."),
	issueType: z.string().min(1, "Please select the type of issue you are facing."),
	issueDescription: z.string().min(1, "Please describe your issue in detail."),
	screenshots: z
		.array(z.instanceof(File))
		.min(1, "Please upload at least one screenshot to help us understand the issue."),
	preferredResponseMethod: z.string().min(1, "Please select your preferred method of response."),
});

type FormProps = z.infer<typeof schema>;

const issueTypes = [
	"Login Problem",
	"Payment Issue",
	"Feature Not Working",
	"Bug Report",
	"General Inquiry",
];

const Page = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			platform: "",
			issueType: "",
			issueDescription: "",
			screenshots: [],
			preferredResponseMethod: "",
		},
		resolver: zodResolver(schema),
	});

	const onSubmit = (values: FormProps) => {
		console.log(values);
	};

	return (
		<>
			<Seo title="Contact" />
			<Navbar />
			<main className="w-full bg-white">
				<section className="pt-[62px] lg:pt-[72px]">
					<div className="w-full bg-primary-200 py-40">
						<div className="container mx-auto flex h-full w-full flex-col items-start justify-center gap-y-4">
							<p className="text-2xl font-bold lg:text-4xl">Help Center</p>
							<p className="text-sm text-neutral-500 lg:text-base">
								{/* write a meaningful message assuraing the user of our commitment to helping them */}
							</p>
							<div className="flex items-center gap-x-10">
								<Button asChild>
									<a href="https://wa.me">Chat with support</a>
								</Button>
								<Button asChild variant="link">
									<a href="tel:+234 703 882 5760">+234 703 882 5760</a>
								</Button>
								<Button asChild variant="link">
									<a href="mailto:support@classore.com">support@classore.com</a>
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full">
					<div className="container mx-auto flex flex-col items-center justify-center gap-y-5 py-10 text-center lg:py-20">
						<div>
							<p className="text-xl font-semibold lg:text-2xl">Contact Us</p>
							<p className="text-sm text-neutral-500">Our team is ever ready to help you</p>
						</div>
						<form className="w-[500px] max-w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
							<Input control={control} label="Name" name="name" type="text" />
							<Input control={control} label="Email" name="email" type="email" />
							<Input control={control} label="Phone Number" name="phoneNumber" type="text" />
							<Select control={control} name="platform" placeholder="Select platform">
								<SelectItem value="android">Android</SelectItem>
								<SelectItem value="ios">iOS</SelectItem>
								<SelectItem value="web">Web</SelectItem>
							</Select>
							<Select control={control} name="issueType" placeholder="Select issue type">
								{issueTypes.map((issue, index) => (
									<SelectItem key={index} value={issue}>
										{issue}
									</SelectItem>
								))}
							</Select>
							<Textarea control={control} label="Issue Description" name="issueDescription" />
							<Select
								control={control}
								name="preferredResponseMethod"
								placeholder="Select preferred response method">
								<SelectItem value="no-preference">No Preference</SelectItem>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="phone">Phone</SelectItem>
							</Select>
							<Button className="w-fit" type="submit">
								{"Submit"}
							</Button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
};

export default Page;
