/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@untitled-ui/icons-react"],
	reactStrictMode: true,
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
}

export default nextConfig
