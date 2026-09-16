import { RiDeleteBin6Line, RiImageLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import React from "react";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UpdateProfileMutation } from "@/queries";
import { useGetProfile } from "@/queries/student";
import { useUserStore } from "@/store/z-store";
import { Textarea } from "../ui/textarea";
import type { HttpError } from "@/types";
import { useFileHandler } from "@/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../shared";

const schema = z.object({
	first_name: z.string().min(1, { message: "Please enter your first name" }),
	last_name: z.string().min(1, { message: "Please enter your last name" }),
	email: z
		.string()
		.min(1, { message: "Please enter your email address" })
		.email("Please enter a valid email"),
	phone_number: z.string().optional().or(z.literal("")),
	description: z.string().optional().or(z.literal("")),
	birthday: z
		.string()
		.optional()
		.or(z.literal(""))
		.transform((d) => {
			if (!d) return "";
			try {
				return format(new Date(d), "MM/dd/yyyy");
			} catch {
				return "";
			}
		}),
	profile_image: typeof window !== "undefined" ? z.instanceof(File).or(z.string()).optional() : z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const formatBirthdayForInput = (dateString?: string) => {
	if (!dateString) return "";
	try {
		return format(new Date(dateString), "yyyy-MM-dd");
	} catch {
		return "";
	}
};

const Profile = () => {
	const { data: user, isPending } = useGetProfile();
	const queryClient = useQueryClient();
	const { setUser } = useUserStore();

	React.useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [setUser, user]);

	const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
		resolver: zodResolver(schema),
		values: {
			first_name: user?.first_name ?? "",
			last_name: user?.last_name ?? "",
			email: user?.email ?? "",
			phone_number: user?.phone_number ?? "",
			description: user?.description ?? "",
			birthday: formatBirthdayForInput(user?.birthday),
			profile_image: user?.profile_image ?? "",
		},
	});
	const avatar = useWatch({
		control,
		name: "profile_image",
	});

	const src = React.useMemo(() => {
		if (typeof avatar === "string") return avatar;
		if (avatar instanceof File) return URL.createObjectURL(avatar);
		return "";
	}, [avatar]);

	React.useEffect(() => {
		return () => {
			if (avatar instanceof File && src) {
				URL.revokeObjectURL(src);
			}
		};
	}, [avatar, src]);

	const { handleClick, handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			const file = files[0];
			if (file) {
				setValue("profile_image", file);
			}
		},
	});

	const { mutate, isPending: updatePending } = useMutation({
		mutationFn: UpdateProfileMutation,
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["profile"],
			});
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response?.data?.message)
				? error.response.data.message[0]
				: error.response?.data?.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
	});

	const onSubmit = (data: FormValues) => {
		mutate(data);
	};

	return (
		<>
			{isPending ? (
				<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
					<Spinner variant="primary" />
					<p className="text-xs text-primary-300">Getting profile details...</p>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3 border-t">
					<div className="flex w-full items-center justify-between border-b border-b-neutral-200 py-5">
						<Avatar className="size-16 border">
							<AvatarImage src={src} className="bg-neutral-100 object-cover" />
							<AvatarFallback className="bg-neutral-200 text-neutral-600 font-medium">
								{user?.first_name?.[0]?.toUpperCase() ?? "U"}
							</AvatarFallback>
						</Avatar>
						<div className="flex items-center gap-2">
							<input
								type="file"
								name="image"
								accept="image/*"
								ref={inputRef}
								onChange={handleFileChange}
								className="hidden"
							/>
							<Button
								type="button"
								onClick={handleClick}
								variant="outline"
								className="w-fit px-4 py-1.5 !text-sm font-normal text-neutral-400">
								<RiImageLine size={20} />
								Change Image
							</Button>
							<Button
								type="button"
								onClick={() => setValue("profile_image", "")}
								variant="outline"
								className="size-9 text-red-600">
								<RiDeleteBin6Line size={20} />
							</Button>
						</div>
					</div>

					<div className="grid w-full gap-2 md:grid-cols-2">
						<Input
							type="text"
							name="first_name"
							label="First Name"
							className="capitalize"
							control={control}
						/>
						<Input
							type="text"
							name="last_name"
							label="Last Name"
							className="capitalize"
							control={control}
						/>
					</div>
					<Input type="email" name="email" label="Email address" control={control} disabled />
					<Input type="date" name="birthday" label="Date of Birth" control={control} />
					<Input
						type="tel"
						name="phone_number"
						label="Phone Number"
						maxLength={15}
						control={control}
					/>
					<Textarea control={control} name="description" label="Describe Yourself" />

					<div className="flex w-full items-center justify-between pt-6 md:pt-10">
						<Button
							type="button"
							variant="text"
							disabled={updatePending}
							className="hidden w-fit !text-sm text-red-500 hover:bg-red-50 hover:text-red-700 md:flex">
							Delete Account
						</Button>
						<div className="flex items-center gap-2 sm:ml-auto">
							<Button
								onClick={() => reset()}
								disabled={updatePending}
								type="button"
								variant="outline"
								className="w-fit !text-sm text-neutral-400">
								Reset Changes
							</Button>
							<Button disabled={updatePending} type="submit" className="w-fit !text-sm font-bold">
								{updatePending ? <Spinner /> : "Save Changes"}
							</Button>
						</div>
					</div>
				</form>
			)}
		</>
	);
};

export default Profile;
