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
			{ protocol: "https", hostname: "i.pravatar.cc" },
			{ protocol: "https", hostname: "picsum.photos" },
			{ protocol: "http", hostname: "dummyimage.com" },
			{ protocol: "http", hostname: "classore.com" },
			{ protocol: "http", hostname: "storage.googleapis.com" },
		],
	},
	eslint: {
		dirs: ["."],
	},
	async redirects() {
		return [
			{
				source: "/dashboard/study-guides",
				destination: "/dashboard/education-hub",
				permanent: true,
			},
			{
				source: "/dashboard/study-guides/:id",
				destination: "/dashboard/education-hub/:id",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
