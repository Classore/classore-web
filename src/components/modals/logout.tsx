import { LogoutGraphic } from "@/assets/icons";
import { useUserStore } from "@/store/z-store";
import { LogOut04 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";

export const LogoutModal = () => {
	const router = useRouter();
	const { signOut } = useUserStore();

	const logout = () => {
		signOut();
		toast.success("Logout successful!");
		router.replace("/signin");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					className="flex w-full items-center gap-2 px-2 py-3 text-sm font-medium text-red-600">
					<LogOut04 height={19} width={19} />
					<span>Log out</span>
				</button>
			</DialogTrigger>

			<DialogContent className="w-96">
				<LogoutGraphic />

				<h3 className="text-2xl font-bold">Log Out?</h3>
				<p className="rounded-lg bg-neutral-100 p-4 text-neutral-400">
					Are you sure you want to log out this account?
				</p>

				<div className="flex items-center gap-4">
					<DialogClose asChild>
						<Button variant="outline" className="font-normal text-neutral-500">
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={logout}>Yes, Log out</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
