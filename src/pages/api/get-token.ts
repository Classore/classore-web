import type { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userId } = req.query;

	if (!userId || typeof userId !== "string") {
		return res.status(400).json({ error: "User ID is required" });
	}

	try {
		const client = StreamChat.getInstance(
			process.env.GETSTREAM_API_KEY || "p5ybpcffwqxp",
			process.env.GETSTREAM_API_SECRET ||
				"ehcvm6xjhyh5uzd29s6tup7yf5ytnprzbwc8drngakeat3nhks6yuszy3mt7maxq"
		);

		const token = client.createToken(userId);

		return res.status(200).json({ token });
	} catch (error) {
		console.error("Token generation error:", error);
		return res.status(500).json({ error: "Failed to generate token" });
	}
}
