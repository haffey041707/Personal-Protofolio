# Muhammad Hafeez Portfolio

Ultra-premium AI engineering portfolio for Muhammad Hafeez, built with Next.js 15, React 19, TypeScript, TailwindCSS, Framer Motion, Three.js, React Three Fiber, Drei, GSAP-ready dependencies, Lenis smooth scroll, and a shadcn-inspired component base.

## License

All rights reserved. This project is public for viewing and portfolio review only. The code, design, visuals, text, and assets may not be copied, reused, modified, redistributed, or deployed without written permission from Muhammad Hafeez.

## Run Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`

## Backend

The Express API is available through:

```bash
npm run dev:backend
```

Backend: `http://localhost:4000`

Set `DATABASE_URL` to persist contact messages with PostgreSQL and Prisma. Optional SMTP settings in `.env.example` enable email notifications.

For the contact form to send email, create `.env.local` and add SMTP settings. With Gmail, use an app password:

```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="haffeypythonista@gmail.com"
SMTP_PASS="your-gmail-app-password"
CONTACT_TO_EMAIL="haffeypythonista@gmail.com"
```

Visitor emails are placed in the message body and the `Reply-To` header, so replying to the email replies to the person who filled the form.

## Checks

```bash
npm run typecheck
npm run build
```
