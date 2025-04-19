import { type SubmitHandler, useForm } from "react-hook-form";
import { RiLoaderLine, RiParentLine } from "@remixicon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";
import * as z from "zod";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import type { HttpError } from "@/types";
import { AddGuardian } from "@/queries";
import { Button } from "../ui/button";
import { IconLabel } from "../shared";
import { Input } from "../ui/input";

const schema = z.object({
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	phone_number: z.string().min(1, "Phone number is required"),
	email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export const KYC = ({ onOpenChange, open }: Props) => {
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			first_name: "",
			last_name: "",
			phone_number: "",
			email: "",
		},
		resolver: zodResolver(schema),
	});

	const { isPending, mutate } = useMutation({
		mutationFn: AddGuardian,
		mutationKey: ["add-guardian"],
		onSuccess: (data) => {
			console.log(data);
			// onOpenChange(false);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong";
			toast.error(message);
		},
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
		mutate(data);
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className="space-y-2">
				<IconLabel icon={RiParentLine} />
				<div>
					<DialogTitle>One last thing</DialogTitle>
					<DialogDescription>
						We'd love to keep contact with you always. Kindly enter yuor guardians&apos;/parents&apos;
						information below
					</DialogDescription>
				</div>
				<form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
					<Input control={control} name="first_name" label="First Name" type="text" />
					<Input control={control} name="first_name" label="Last Name" type="text" />
					<Input control={control} name="phone_number" label="Phone Number" type="tel" />
					<Input control={control} name="email" label="Email" type="email" />
					<Button type="submit" disabled={isPending}>
						{isPending ? <RiLoaderLine className="animate-spin" /> : "Save"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
