// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import fs from "fs"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			return res.status(405).json({ error: "Method not allowed" })
		}

		const pathToFile = path.join(process.cwd(), "src/assets/files/classore.pdf")
		if (!fs.existsSync(pathToFile)) {
			return res.status(404).json({ error: "File not found" })
		}
		const file = fs.readFileSync(pathToFile, "utf-8")
		res.setHeader("Content-Type", "application/pdf")
		res.setHeader("Content-Disposition", "attachment; filename=classore.pdf")
		return res.status(200).send(file)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
}
