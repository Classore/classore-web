import { RiDeleteBin6Line } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";

import { Button } from "@/components/ui/button";
import { IconLabel } from "@/components/shared";
import { queryClient } from "@/providers";
import type { HttpError } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
	wardId: string;
}

export const DeleteWard = ({ wardId }: Props) => {
	const [open, setOpen] = React.useState(false);

	const {} = useMutation({
		mutationKey: ["delete-ward", wardId],
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["get-parent-home"] });
			setOpen(false);
		},
	});

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button variant="text-destructive" size="sm" className="w-fit">
					Delete Ward
				</Button>
			</DialogTrigger>
			<DialogContent>
				<IconLabel icon={RiDeleteBin6Line} variant="destructive" />
				<div>
					<DialogTitle>Delete Ward</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this ward? This action cannot be undone.
					</DialogDescription>
					<div className="mt-6 flex w-full justify-end gap-x-4">
						<Button className="w-fit" size="sm" variant="outline" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button className="w-fit" size="sm" variant="destructive" onClick={() => setOpen(false)}>
							Delete
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
