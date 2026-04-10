import type { VercelRequest, VercelResponse } from "@vercel/node";
import twilio from "twilio";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { phone, medicine } = req.body;

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    await client.calls.create({
      to: phone,
      from: process.env.TWILIO_PHONE,
      twiml: `<Response><Say voice="Polly.Joanna">Hello! This is your ElderCare reminder. It is time to take your ${medicine}. Please take your medicine now. Have a healthy day!</Say></Response>`,
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}