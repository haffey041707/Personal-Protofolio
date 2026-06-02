import cors from "cors";
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  subject: z.string().min(3).max(140),
  message: z.string().min(10).max(2000)
});

const app = express();
const port = Number(process.env.PORT ?? 4000);
const prisma = process.env.DATABASE_URL ? new PrismaClient() : null;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    database: Boolean(prisma),
    service: "muhammad-hafeez-portfolio-api"
  });
});

app.post("/api/contact", async (request, response) => {
  const parsed = contactSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      ok: false,
      message: "Please check the form fields and try again."
    });
    return;
  }

  try {
    const skipEmail = request.get("x-skip-email") === "true";
    const saved = prisma
      ? await prisma.contactMessage.create({ data: parsed.data })
      : null;

    const emailSent = skipEmail ? false : await notifyContact(parsed.data);

    response.status(201).json({
      ok: true,
      id: saved?.id ?? null,
      persisted: Boolean(saved),
      emailSent,
      message:
        emailSent || skipEmail
          ? "Message transmitted."
          : "Message received locally. Email is not configured."
    });
  } catch (error) {
    console.error("contact:error", error);
    response.status(500).json({
      ok: false,
      message: "Transmission failed. Please try again."
    });
  }
});

async function notifyContact(contact: z.infer<typeof contactSchema>) {
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
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Subject: ${contact.subject}`,
      "",
      contact.message
    ].join("\n")
  });

  return true;
}

const server = app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});

process.on("SIGTERM", async () => {
  server.close();
  await prisma?.$disconnect();
});
