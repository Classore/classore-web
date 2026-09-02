/**
 * /api/auth/logout — Clears the CLASSORE_TOKEN cookie server-side.
 *
 * The middleware reads the cookie from request headers, so clearing it
 * client-side with js-cookie is not sufficient on its own — the next
 * server-side request would still carry the old cookie until a page reload.
 * This route expires it immediately via a Set-Cookie response header.
 */

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    // Expire the cookie immediately by setting max-age to 0
    res.setHeader(
        "Set-Cookie",
        "CLASSORE_TOKEN=; Path=/; Max-Age=0; SameSite=Lax"
    );
    return res.status(200).json({ success: true });
}
