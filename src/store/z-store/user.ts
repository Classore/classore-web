import Cookies from "js-cookie";

import { createPersistMiddleware } from "../middleware";
import type { Maybe, UserProps } from "@/types";
import { setToken } from "@/lib/cookies";

interface UserStore {
	user: Maybe<UserProps>;
	signIn: (user: UserProps, token: string) => void;
	signOut: () => void;
	setUser: (user: UserProps) => void;
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
