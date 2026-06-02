import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  subject: z.string().min(3).max(140),
  message: z.string().min(10).max(2000)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  let emailSent = false;

  try {
    emailSent = await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("contact:email:error", error);
    return NextResponse.json(
      { ok: false, message: "Email sending failed. Please check SMTP settings." },
      { status: 500 }
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (backendUrl) {
    try {
      const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(emailSent ? { "x-skip-email": "true" } : {})
        },
        body: JSON.stringify(parsed.data),
        cache: "no-store"
      });

      const data = (await response.json().catch(() => ({}))) as { emailSent?: boolean };

      if (response.ok && (emailSent || data.emailSent)) {
        return NextResponse.json({ ok: true, message: "Message transmitted." });
      }
    } catch {
      // Continue with local email result for preview environments.
    }
  }

  if (emailSent) {
    return NextResponse.json({ ok: true, message: "Message transmitted." });
  }

  return NextResponse.json(
    {
      ok: false,
      message: "Email is not configured yet. Add SMTP settings to .env.local."
    },
    { status: 503 }
  );
}

async function sendContactEmail(contact: z.infer<typeof contactSchema>) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL = "haffeypythonista@gmail.com"
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"${contact.name} via Portfolio" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: `"${contact.name}" <${contact.email}>`,
    subject: `[Portfolio] ${contact.subject}`,
    text: [
      "New message from Muhammad Hafeez portfolio.",
      "",
      `From: ${contact.name} <${contact.email}>`,
      `Subject: ${contact.subject}`,
      "",
      contact.message
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>New message from Muhammad Hafeez portfolio</h2>
        <p><strong>From:</strong> ${escapeHtml(contact.name)} &lt;${escapeHtml(contact.email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
        <hr />
        <p>${escapeHtml(contact.message).replace(/\n/g, "<br />")}</p>
      </div>
    `
  });

  return true;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
