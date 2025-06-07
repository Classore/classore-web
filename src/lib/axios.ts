import Cookies from "js-cookie";
import { toast } from "sonner";
import axios from "axios";

const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";

const api = axios.create({
	baseURL: isDev
		? process.env.NEXT_PUBLIC_API_URL
		: "https://classore-be-prod-1.up.railway.app/classore/v1",
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("CLASSORE_TOKEN");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.status === 401) {
			localStorage.removeItem("classore-user");
			localStorage.removeItem("CLASSORE_USER");
			Cookies.remove("CLASSORE_TOKEN");
		}
		if (error.status === 403) {
			toast.error("You are not authorized to access this resource");
		}
	}
);

export { api as axios };
