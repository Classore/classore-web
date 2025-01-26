import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const setToken = (cookie: string) => {
	const decoded = jwtDecode(cookie);

	Cookies.set("CLASSORE_TOKEN", cookie, {
		expires: decoded?.exp
			? new Date(decoded?.exp * 1000)
			: new Date(Date.now() + 7 * 24 * 60 * 60), // 7 days,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
};

const getToken = () => {
	return Cookies.get("CLASSORE_TOKEN");
};

export { getToken, setToken };
