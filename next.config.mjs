/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@untitled-ui/icons-react"],
	reactStrictMode: true,
	output: "standalone",
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "flagsapi.com" },
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "http", hostname: "dummyimage.com" },
		],
	},
}

export default nextConfig
