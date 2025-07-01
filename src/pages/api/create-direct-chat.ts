import type { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

import { env } from "@/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { currentUserId, otherUserId } = req.body;

	if (!currentUserId || !otherUserId) {
		return res.status(400).json({ error: "User IDs are required" });
	}

	try {
		const serverClient = StreamChat.getInstance(env.GETSTREAM_API_KEY, env.GETSTREAM_API_SECRET);

		const channelId = [currentUserId, otherUserId].sort().join("-");

		const channel = serverClient.channel("messaging", channelId, {
			members: [currentUserId, otherUserId],
			created_by_id: currentUserId,
		});

		await channel.create();

		return res.status(200).json({
			channelId,
			message: "Direct message channel created successfully",
		});
	} catch (error) {
		console.error("Direct chat creation error:", error);
		return res.status(500).json({ error: "Failed to create direct message channel" });
	}
}
