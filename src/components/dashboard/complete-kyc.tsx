import { RiLoaderLine, RiShieldUserLine } from "@remixicon/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import React from "react";
import * as z from "zod";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { UpdateProfileMutation } from "@/queries";
import { queryClient } from "@/providers";
import { Textarea } from "../ui/textarea";
import type { HttpError } from "@/types";
import { Button } from "../ui/button";
import { IconLabel } from "../shared";
import { Input } from "../ui/input";

const schema = z.object({
	bio: z.string().optional(),
	birthday: z
		.string({ required_error: "Please enter your date of birth" })
		.min(1, { message: "Please enter your date of birth" })
		.transform((d) => format(d, "MM/dd/yyyy")),
	phone_number: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export const CompleteKyc = ({ onOpenChange, open }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: UpdateProfileMutation,
		onSuccess: () => {
			toast.success("Profile updated successfully");
			onOpenChange(false);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["profile"],
			});
			window.location.reload();
		},
	});

	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			birthday: "",
		},
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		mutate(data);
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<IconLabel icon={RiShieldUserLine} />
				<div className="space-y-2">
					<DialogTitle className="text-xl font-bold">Update Birthday</DialogTitle>
					<DialogDescription className="text-sm text-neutral-400">
						Your story matters to us. Tell us a few things about yourself, so we can walk with you,
						celebrate you, and support you every step of the way.
					</DialogDescription>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Input type="date" name="birthday" label="Date of Birth" control={control} />
					<Input type="tel" name="phone_number" label="Phone Number" control={control} />
					<Textarea name="bio" label="Bio" control={control} />
					<Button type="submit">
						{isPending ? <RiLoaderLine className="animate-spin" size={24} /> : "save Changes"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
