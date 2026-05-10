CREATE TYPE "Role" AS ENUM ('WORKER', 'ADMIN');
CREATE TYPE "LeadSource" AS ENUM ('CRAIGSLIST', 'FACEBOOK');
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "PayrollStatus" AS ENUM ('FINALIZED', 'PAID');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'WORKER',
  "baseSalary" DECIMAL(12,2) NOT NULL DEFAULT 9000,
  "simCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "LeadSubmission" (
  "id" TEXT NOT NULL,
  "workerId" TEXT NOT NULL,
  "source" "LeadSource" NOT NULL,
  "date" DATE NOT NULL,
  "monthKey" TEXT NOT NULL,
  "leadCount" INTEGER NOT NULL,
  "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
  "rejectionReason" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approvedAt" TIMESTAMP(3),
  "approvedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "LeadSubmission_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LeadSubmission_workerId_monthKey_idx" ON "LeadSubmission"("workerId", "monthKey");
CREATE INDEX "LeadSubmission_status_idx" ON "LeadSubmission"("status");
ALTER TABLE "LeadSubmission" ADD CONSTRAINT "LeadSubmission_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LeadSubmission" ADD CONSTRAINT "LeadSubmission_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "PayrollRun" (
  "id" TEXT NOT NULL,
  "workerId" TEXT NOT NULL,
  "monthKey" TEXT NOT NULL,
  "baseSalary" DECIMAL(12,2) NOT NULL,
  "approvedLeadCount" INTEGER NOT NULL,
  "leadRate" DECIMAL(12,2) NOT NULL,
  "leadCommission" DECIMAL(12,2) NOT NULL,
  "gross" DECIMAL(12,2) NOT NULL,
  "pension" DECIMAL(12,2) NOT NULL,
  "simCost" DECIMAL(12,2) NOT NULL,
  "netPayable" DECIMAL(12,2) NOT NULL,
  "status" "PayrollStatus" NOT NULL DEFAULT 'FINALIZED',
  "finalizedById" TEXT NOT NULL,
  "finalizedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "paidAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PayrollRun_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "PayrollRun_workerId_monthKey_key" ON "PayrollRun"("workerId", "monthKey");
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "actorId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
