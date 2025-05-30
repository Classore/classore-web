import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import * as z from "zod";

import { ChangePasswordMutation } from "@/queries";
import { useUserStore } from "@/store/z-store";
import type { HttpError } from "@/types";
import { Button } from "../ui/button";
import { Spinner } from "../shared";
import { Input } from "../ui/input";

const schema = z
	.object({
		old_password: z.string().min(1, { message: "Old password is required" }).trim(),
		new_password: z
			.string()
			.min(1, { message: "New password is required" })
			.min(8, {
				message: "Password cannot be less than 8 characters",
			})
			.max(30, { message: "Password cannot be more than 30 characters" })
			.regex(/(?=.*[A-Z])/, {
				message: "Must contain at least one uppercase character",
			})
			.regex(/(?=.*[a-z])/, {
				message: "Must contain at least one lowercase character",
			})
			.regex(/(?=.*\d)/, {
				message: "Must contain at least one number",
			})
			.regex(/^(?=.*?[#?_!@$%^*-])/, {
				message: "Must contain at least one special character",
			})
			.trim(),
		confirm_new_password: z
			.string()
			.min(1, { message: "Confirm new password is required" })
			.min(8, {
				message: "Password cannot be less than 8 characters",
			})
			.max(30, { message: "Password cannot be more than 30 characters" })
			.regex(/(?=.*[A-Z])/, {
				message: "Must contain at least one uppercase character",
			})
			.regex(/(?=.*[a-z])/, {
				message: "Must contain at least one lowercase character",
			})
			.regex(/(?=.*\d)/, {
				message: "Must contain at least one number",
			})
			.regex(/^(?=.*?[#?_!@$%^*-])/, {
				message: "Must contain at least one special character",
			})
			.trim(),
	})
	.superRefine((values, ctx) => {
		if (values.new_password !== values.confirm_new_password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirm_new_password"],
			});
		}
	});

type SecurityFormValues = z.infer<typeof schema>;

const Security = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { signOut } = useUserStore();
	const { control, handleSubmit, reset } = useForm<SecurityFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			old_password: "",
			new_password: "",
			confirm_new_password: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["change-password"],
		mutationFn: (values: Omit<SecurityFormValues, "confirm_new_password">) =>
			ChangePasswordMutation(values),
		onSuccess: () => {
			toast.success("Password changed successfully");
			queryClient.clear();
			signOut();
			router.replace("/signin");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
	});

	const onChangePassword = (values: SecurityFormValues) => {
		mutate({
			old_password: values.old_password,
			new_password: values.new_password,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onChangePassword)}
			className="flex h-full w-full flex-col justify-between gap-5 border-t py-5">
			<Input type="password" name="old_password" label="Current Password" control={control} />
			<Input type="password" name="new_password" label="New Password" control={control} />
			<Input
				type="password"
				name="confirm_new_password"
				label="Confirm New Password"
				control={control}
			/>

			<div className="ml-auto flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					className="w-fit !text-sm text-neutral-400"
					onClick={() => reset()}>
					Reset Changes
				</Button>
				<Button disabled={isPending} type="submit" className="w-fit !text-sm font-bold">
					{isPending ? <Spinner /> : "Save Changes"}
				</Button>
			</div>
		</form>
	);
};

export default Security;
