import Image from "next/image";
import React from "react";

import { appStore, playStore } from "@/assets/images";

export const AppStore = () => {
	// https://apps.apple.com/app/classore/id6747850881
	return (
		<a href="https://apps.apple.com/app/classore/id6747850881" target="_blank" className="">
			<Image src={appStore} alt="App Store" />
		</a>
	);
};

export const PlayStore = () => {
	// https://play.google.com/store/apps/details?id=com.classore.app
	return (
		<a href="https://play.google.com/store/apps/details?id=com.samrheglobal.classore" target="_blank" className="">
			<Image src={playStore} alt="Play Store" />
		</a>
	);
};
