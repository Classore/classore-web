import type { NextApiRequest, NextApiResponse } from "next";
import type { UserRequest } from "@stream-io/node-sdk";
import { StreamClient } from "@stream-io/node-sdk";

import { generateUniqueNames } from "@/lib";

const color = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userId, role, name } = req.query;

	if (!userId || typeof userId !== "string") {
		return res.status(400).json({ error: "User ID is required" });
	}

	if (!role || typeof role !== "string") {
		return res.status(400).json({ error: "User role is required" });
	}

	try {
		const apiKey = process.env.GETSTREAM_API_KEY || "p5ybpcffwqxp";
		const apiSecret =
			process.env.GETSTREAM_API_SECRET ||
			"ehcvm6xjhyh5uzd29s6tup7yf5ytnprzbwc8drngakeat3nhks6yuszy3mt7maxq";

		if (!apiKey || !apiSecret) {
			return res.status(500).json({ error: "Stream API credentials not configured" });
		}

		const client = new StreamClient(apiKey, apiSecret);

		const user: UserRequest = {
			id: userId,
			role,
			custom: { color },
			name: String(name) ?? generateUniqueNames(1)[0],
		};

		await client.upsertUsers([user]);
		const token = client.generateUserToken({ user_id: userId });

		return res.status(200).json({
			token,
			apiKey,
		});
	} catch (error) {
		console.error("Video token generation error:", error);
		return res.status(500).json({ error: "Failed to generate video token" });
	}
}
