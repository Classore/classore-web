import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const setToken = (cookie: string) => {
	const decoded = jwtDecode(cookie);

	Cookies.set("CLASSORE_TOKEN", cookie, {
		expires: decoded?.exp ? new Date(decoded?.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60), // 7 days,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
};

const getToken = () => {
	return Cookies.get("CLASSORE_TOKEN");
};

const setUserType = (type: string) => {
	Cookies.set("CLASSORE_USER_TYPE", type, {
		expires: new Date(Date.now() + 7 * 24 * 60 * 60), // 7 days,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
};

const getUserType = () => {
	return Cookies.get("CLASSORE_USER_TYPE");
};

export { getToken, getUserType, setToken, setUserType };
