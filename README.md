# AFF Bird Payroll

Dark themed Next.js payroll and lead tracking dashboard for lead workers and admins.

## Fast UI preview (no PostgreSQL needed)

This project includes a temporary demo mode for non-technical UI preview. Demo mode uses mock login and mock payroll/lead data, so you do **not** need to set up PostgreSQL.

1. Install dependencies:

```bash
npm install
```

2. Start the demo server:

```bash
npm run dev:demo
```

3. Open the local preview URL shown in the terminal, usually:

```text
http://localhost:3000/login
```

4. Click **Preview as worker** or **Preview as admin**, or use these mock credentials:

- Admin: `admin@affbird.test` / `admin12345`
- Worker: `sakilahammed02968@gmail.com` / `worker12345`

Demo mode can also be enabled by setting `AFF_BIRD_DEMO_MODE="true"`. In local development, the app also falls back to demo mode when `DATABASE_URL` is not set.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- PostgreSQL with Prisma ORM for real data mode
- NextAuth credentials authentication
- Zod validation, Lucide icons, Vitest payroll tests

## Features

- Worker dashboard, My Leads, Submissions, Payroll History, and Settings pages
- Add Leads modal copy and validation-ready workflow
- Admin dashboard, submissions, employee management, and payroll preview pages
- Temporary demo mode with mock users, submissions, payroll history, and no database requirement
- Prisma schema for users, lead submissions, payroll runs, and audit logs
- Seed script with admin and worker (`MD. SAZEDUL ISLAM`, `sakilahammed02968@gmail.com`)
- Tiered payroll calculation utility with tests

## Real database setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set demo mode to false and update `DATABASE_URL` to point at PostgreSQL:

```env
AFF_BIRD_DEMO_MODE="false"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aff_bird_payroll?schema=public"
```

4. Run migrations and seed:

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

5. Start the development server:

```bash
npm run dev
```

Default seeded credentials:

- Admin: `admin@affbird.test` / `admin12345`
- Worker: `sakilahammed02968@gmail.com` / `worker12345`

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
```

## Payroll rules

The approved monthly lead count determines the single lead rate for all approved leads that month. Formula:

```text
leadCommission = approvedLeadCount * leadRate
gross = baseSalary + leadCommission
pension = gross * 0.05
netPayable = gross - pension - simCost
```
