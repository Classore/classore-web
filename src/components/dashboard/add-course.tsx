import { RiAddLine } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { Button } from "@/components/ui/button";
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

export const AddWardCourse = ({ wardId }: Props) => {
	const [open, setOpen] = React.useState(false);

	const {} = useMutation({
		mutationKey: ["add-course-ward", wardId],
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error: HttpError) => {
			console.error(error);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["get-parent-home"] });
			setOpen(false);
		},
	});

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button size="sm" className="w-fit">
					<RiAddLine /> Add Course
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</div>
			</DialogContent>
		</Dialog>
	);
};
