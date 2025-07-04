import { useQuery } from "@tanstack/react-query";
import { RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";

import type { HttpResponse, UserProfileResp } from "@/types";
import { useUserStore } from "@/store/z-store";
import { endpoints } from "@/config";

const Page = () => {
	const { signIn } = useUserStore();
	const router = useRouter();
	const token = router.query.token as string;

	const api = axios.create({
		baseURL:
			process.env.NEXT_PUBLIC_API_URL ||
			"https://classore-be-june-224829194037.europe-west1.run.app/classore/v1",
	});

	api.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});

	const getProfile = async () => {
		return api.get<HttpResponse<UserProfileResp>>(endpoints().auth.profile).then((res) => res.data);
	};

	const { data: user } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
		select: (data) => data.data,
	});

	React.useEffect(() => {
		if (user) {
			signIn(user, token);
			router.push("/dashboard");
		}
	}, [router, signIn, token, user]);

	return (
		<div className="grid h-screen w-screen place-items-center">
			<div className="flex w-[400px] flex-col items-center gap-y-5">
				<p>Please wait while we redirect you to the dashboard</p>
				<RiLoaderLine className="size-10 animate-spin text-primary-500" />
			</div>
		</div>
	);
};

export default Page;
