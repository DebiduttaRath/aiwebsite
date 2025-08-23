// api/contact.ts - This will work on Vercel even if main server doesn't
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // This is a fallback that will work on Vercel
  if (req.method === "POST") {
    res.status(200).json({
      success: true,
      message: "Contact form received (Vercel fallback)",
      data: req.body,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
