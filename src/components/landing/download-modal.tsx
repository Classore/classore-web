import Image from "next/image";
import React from "react";

import MobileAppImg from "@/assets/images/mobile-img.webp";
import { AppStore, PlayStore } from "@/components/shared/app-download";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface DownloadModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onOpenChange }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[420px] rounded-2xl p-6">
				<div className="flex w-full flex-col gap-6 text-center">
					<DialogHeader className="space-y-2 text-center sm:text-center">
						<DialogTitle className="text-xl font-bold text-neutral-900">
							Download Mobile App
						</DialogTitle>
						<DialogDescription className="text-sm text-neutral-500">
							Learn, practice, and compete anywhere on iOS and Android.
						</DialogDescription>
					</DialogHeader>

					<div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-primary-50 to-primary-100 p-4">
						<Image
							src={MobileAppImg}
							alt="Classore mobile app"
							width={180}
							height={180}
							className="object-contain drop-shadow-md"
						/>
					</div>

					<div className="flex w-full flex-col sm:flex-row items-center justify-center gap-3">
						<AppStore />
						<PlayStore />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
