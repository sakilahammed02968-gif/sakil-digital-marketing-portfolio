# AFF Bird Payroll

Dark themed Next.js payroll and lead tracking dashboard for lead workers and admins.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- PostgreSQL with Prisma ORM
- NextAuth credentials authentication
- Zod validation, Lucide icons, Vitest payroll tests

## Features

- Worker dashboard, My Leads, Submissions, Payroll History, and Settings pages
- Add Leads modal copy and validation-ready workflow
- Admin dashboard, submissions, employee management, and payroll preview pages
- Prisma schema for users, lead submissions, payroll runs, and audit logs
- Seed script with admin and worker (`MD. SAZEDUL ISLAM`, `sakilahammed02968@gmail.com`)
- Tiered payroll calculation utility with tests

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `DATABASE_URL` to point at PostgreSQL, then run migrations and seed:

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

4. Start the development server:

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
