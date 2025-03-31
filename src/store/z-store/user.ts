import Cookies from "js-cookie";

import type { Maybe, UserProfileResp, UserProps } from "@/types";
import { createPersistMiddleware } from "../middleware";
import { setToken } from "@/lib/cookies";

interface UserStore {
	user: Maybe<UserProps | UserProfileResp>;
	signIn: (user: UserProps | UserProfileResp, token: string) => void;
	signOut: () => void;
	setUser: (user: UserProps | UserProfileResp) => void;
}

const initialState: UserStore = {
	user: null,
	signIn: () => {},
	signOut: () => {},
	setUser: () => {},
};

const useUserStore = createPersistMiddleware<UserStore>("classore-user", (set) => ({
	...initialState,
	setUser: (user) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { access_token, password, ...rest } = user;

		// @ts-expect-error nil
		set(() => ({ user: rest }));
	},
	signIn: (user, token) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { access_token, password, ...rest } = user;

		// @ts-expect-error nil
		set(() => ({ user: rest }));
		setToken(token);
	},
	signOut: () => {
		set(() => ({ user: null }));
		localStorage.removeItem("classore-user");
		localStorage.removeItem("CLASSORE_USER");
		Cookies.remove("CLASSORE_TOKEN");
	},
}));

export { useUserStore };
