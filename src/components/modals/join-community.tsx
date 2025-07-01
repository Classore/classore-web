import Link from "next/link";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
	roomId: string;
}

export const JoinCommunityModal = ({ roomId }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-fit rounded-md text-xs" size="sm" variant="secondary">
					Join
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<DialogTitle className="text-2xl font-bold">Join Community</DialogTitle>
				<div className="relative h-[111px] rounded-lg border">
					<Image
						src="/assets/images/join-community.png"
						alt="join community"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>
				<DialogDescription className="font-neutral-400 py-3 text-sm">
					By joining the community, it means you agree to Classore community terms and conditions while
					learning and making friends.
				</DialogDescription>
				<hr className="w-full bg-neutral-400" />
				<Button asChild>
					<Link href={`/dashboard/community?roomId=${roomId}`}>Yes, I agree</Link>
				</Button>
			</DialogContent>
		</Dialog>
	);
};
