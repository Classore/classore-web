/**
 * /api/auth/signup — Server-side proxy for the signup endpoint.
 *
 * This exists purely so that the full signup API response (including the OTP
 * in development) is printed to the Next.js server terminal, not just the
 * browser DevTools console.
 *
 * ⚠️  DEV ONLY — The console.log below logs the OTP. REMOVE / COMMENT OUT BEFORE PUSHING TO PROD.
 */

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://classore-be-june-224829194037.europe-west1.run.app/classore/v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, req.body, {
            headers: {
                "Content-Type": "application/json",
                ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
            },
            timeout: 15000,
        });

        // ⚠️  DEV ONLY — Logs the full signup response in the Next.js server terminal.
        // This will contain the OTP if the backend includes it in the response.
        // COMMENT OUT THE LINE BELOW BEFORE PUSHING TO PROD.
        console.log("[DEV] Signup API response (look for OTP):\n", JSON.stringify(response.data, null, 2));
        // ⚠️  END DEV ONLY

        return res.status(response.status).json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        console.error("[signup proxy] Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
