import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, error: "invalid" }, { status: 400 });
  }

  const { name, email, message, botcheck } = body as Record<string, unknown>;

  // Honeypot — pretend success so bots learn nothing.
  if (botcheck) {
    return NextResponse.json({ success: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim() ||
    name.length > 200 ||
    email.length > 200 ||
    message.length > 5000 ||
    !EMAIL_RE.test(email.trim())
  ) {
    return NextResponse.json({ success: false, error: "invalid" }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ success: false, error: "not_configured" }, { status: 503 });
  }

  // Strip CR/LF so user input can never inject mail headers.
  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const safeEmail = email.trim();

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to: process.env.CONTACT_TO ?? user,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `Portfolio contact from ${safeName}`.slice(0, 200),
      text: `${message.trim()}\n\n— ${safeName} (${safeEmail})`,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "send_failed" }, { status: 502 });
  }
}
