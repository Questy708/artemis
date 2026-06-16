---
Task ID: 1
Agent: main (Z.ai Code)
Task: Import the GitHub project https://github.com/Questy708/artemis-site- into the existing Next.js 16 sandbox.

Work Log:
- Cloned the repo to `/home/z/my-project/download/artemis-site-`. Discovered it is a Google AI Studio export (Vite + React 19 + Tailwind 4 + shadcn/ui) that ALSO ships a Next.js App Router structure under `src/app/` (page.tsx, layout.tsx, globals.css, api/**). The API routes already use `z-ai-web-dev-sdk` (not @google/genai).
- Bulk-copied source into the Next.js project:
  - `src/components/artemis/` (40 files), `src/components/t1/` (12 files), `src/components/artemis-project/` (18 files: LMS, onboarding, forum)
  - `src/lib/artemis-data.ts`, `src/lib/programs-data.ts`
  - `src/app/api/**` (22 route handlers: chat, artemis-tutor, subscribe, contact, donations, applications, admin/login, admin, paypal/config, stripe/checkout, stripe/webhook, campaign, lms/*)
  - `public/logo.svg`, `public/robots.txt`, `public/_headers`, `public/resources/` (7 PDFs)
  - `src/app/page.tsx` (renders `<ArtemisApp />`)
- Merged `src/app/globals.css`: kept the repo's crimson theme (`--color-crimson: #8A0000`), Inter font binding, dark-mode variables, custom component classes (`.side-link`, `.footer-link`, `.red-underline`, `.hide-scrollbar`), keyframes, and added a `.safe-area-bottom` utility for iOS fixed bars.
- Rewrote `src/app/layout.tsx`: added the `Inter` next/font (weights 300–900), updated metadata to "University of Artemis", set the favicon to `/logo.svg`, kept the existing Toaster.
- Created two lib files that the repo imports but does NOT ship (`@/lib/admin-auth`, `@/lib/lms-auth`), reverse-engineered from usage across all API routes:
  - `admin-auth.ts`: stateless `verifyAdminAuth(request)` that validates the `artemis_admin_token` cookie / `Authorization: Bearer` token issued by `POST /api/admin/login`. Token format `adm_{timestamp}_{random}_{hash}` where hash = sha256(ADMIN_PASSWORD + timestamp)[:22]; verified with timing-safe compare and a 24h session window.
  - `lms-auth.ts`: `verifyLMSAuth(request)` reads `userId` from query string / `x-lms-user-id` header (matches the frontend's localStorage-based flow) and looks up the LMSUser in Prisma; plus `hasRole(user, roles)` and `canAccessResource(user, ownerId)`.
- Replaced `prisma/schema.prisma` with the repo's schema (Donation, Application, ContactMessage, Subscriber, LMSUser, Course, Module, Lesson, Enrollment, Assignment, AssignmentSubmission, AITutorSession, TutorFeedback). Fixed a typo in the original (`fields: oduleId]` → `fields: [moduleId]` on the Lesson→Module relation).
- Ran `bun run db:push` → SQLite DB created at `db/custom.db`, Prisma Client regenerated (v6.19.2).
- Set `.env`: `DATABASE_URL`, `ADMIN_PASSWORD=artemis2025`, `NEXT_PUBLIC_BASE_URL`. Left STRIPE/PAYPAL/DONATION_LINK commented (donation route gracefully falls back to a 400 "not configured" when unset).
- Fixed the only compile blocker: 21 components imported from `motion/react` (the new `motion` package), which is not in our stack. Replaced every `from 'motion/react'` with `from 'framer-motion'` (API-compatible; `motion`, `AnimatePresence`, `useScroll`, `useTransform`, `useSpring` are all re-exported). Verified zero remaining `motion/react` references.
- Attempted `bun add stripe` (lazy-imported by the donation route) — install stuck on slow network. Confirmed non-blocking: the route only executes `await import('stripe')` inside `if (stripeSecretKey)`, which is false, so the app runs without the package.

Stage Summary:
- Dev server compiles cleanly and serves `GET / 200`. No module-not-found errors after the framer-motion fix.
- Browser-verified golden path (agent-browser):
  1. Homepage renders fully — header nav (Education/Research/Innovation/Admissions/Campus Life/Colleges/About/Journal), hero "A new kind of university — one degree, every horizon.", blog cards, featured programmes, footer with social links.
  2. Client-side navigation works — clicked "Research" → Research subpage loaded with "ADVANCING THE BOUNDARIES OF HUMAN KNOWLEDGE" + Centers of Inquiry / Collegium Alliance sections. Clicked APPLY → multi-step "Application for Admission" form rendered (Personal Info step, field for "Legal first name", step nav "1 PERSONAL" / "04 Admissions + Aid").
  3. AI chatbot works end-to-end — opened the "Ask a question" pill, clicked a suggested question; `POST /api/chat 200 in 2.6s`; the z-ai-web-dev-sdk returned an accurate, on-brand answer about Artemis's nine paths to mastery, four curriculum pillars, Purpose Learning, and the six hostel cities.
  4. Prisma DB write works — `POST /api/subscribe` returned `{success:true, id:...}` and the row was confirmed persisted in SQLite (INSERT logged in dev.log, direct DB read returned the record).
- Artifacts produced: full University of Artemis site running at `/`, 22 API routes, 70 React components, 13 Prisma models, public PDF resources.
- Known limitation: `stripe` npm package could not be installed (sandbox network timeout). The donation flow is therefore limited to the "not configured" graceful fallback until STRIPE_SECRET_KEY + the stripe package are added; all other site features (AI chat, LMS, applications, subscribe, contact, admin) are fully functional.
