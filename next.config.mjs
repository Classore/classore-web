/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@untitled-ui/icons-react"],
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "flagsapi.com" },
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "storage.googleapis.com" },
			{ protocol: "http", hostname: "dummyimage.com" },
			{ protocol: "http", hostname: "classore.com" },
		],
	},
};

export default nextConfig;
