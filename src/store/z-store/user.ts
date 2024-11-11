import Cookies from "js-cookie"

import { createPersistMiddleware } from "../middleware"
import type { Maybe, UserProps } from "@/types"

interface UserStore {
	user: Maybe<UserProps>
	signIn: (user: UserProps, token: string) => void
	signOut: () => void
}

const initialState: UserStore = {
	user: null,
	signIn: () => {},
	signOut: () => {},
}

const useUserStore = createPersistMiddleware<UserStore>("classore-user", (set) => ({
	...initialState,
	signIn: (user, token) => {
		set(() => ({ user }))
		Cookies.set("CLASSORE_TOKEN", token)
	},
	signOut: () => {
		set(() => ({ user: null }))
		Cookies.remove("CLASSORE_TOKEN")
	},
}))

export { useUserStore }
