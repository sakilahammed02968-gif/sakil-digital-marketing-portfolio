"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";
import { monthKey, calculatePayroll } from "@/lib/payroll";

const addLeadSchema = z.object({ source: z.enum(["CRAIGSLIST", "FACEBOOK"]), date: z.coerce.date(), leadCount: z.coerce.number().int().positive() });
const requireUser = async () => { const session = await getServerSession(authOptions); if (!session?.user?.id) throw new Error("Unauthorized"); return session.user; };
const requireAdmin = async () => { const user = await requireUser(); if (user.role !== "ADMIN") throw new Error("Forbidden"); return user; };

export async function addLeadSubmission(formData: FormData) {
  const user = await requireUser();
  const parsed = addLeadSchema.parse(Object.fromEntries(formData));
  if (isDemoMode) {
    revalidatePath("/dashboard");
    revalidatePath("/my-leads");
    revalidatePath("/submissions");
    return { demo: true, message: `Demo mode: saved ${parsed.leadCount} ${parsed.source.toLowerCase()} leads for preview only.` };
  }

  const { prisma } = await import("@/lib/prisma");
  const date = new Date(Date.UTC(parsed.date.getUTCFullYear(), parsed.date.getUTCMonth(), parsed.date.getUTCDate()));
  const existing = await prisma.leadSubmission.findFirst({ where: { workerId: user.id, source: parsed.source, date, status: "PENDING" } });
  if (existing) await prisma.leadSubmission.update({ where: { id: existing.id }, data: { leadCount: parsed.leadCount, submittedAt: new Date() } });
  else await prisma.leadSubmission.create({ data: { workerId: user.id, source: parsed.source, date, monthKey: monthKey(date), leadCount: parsed.leadCount, status: "PENDING" } });
  revalidatePath("/dashboard");
}
export async function approveSubmission(id: string, leadCount?: number) {
  const admin = await requireAdmin();
  if (isDemoMode) {
    revalidatePath("/admin/submissions");
    return { demo: true, message: `Demo mode: ${id} would be approved${leadCount ? ` with ${leadCount} leads` : ""}.` };
  }

  const { prisma } = await import("@/lib/prisma");
  await prisma.leadSubmission.update({ where: { id }, data: { leadCount, status: "APPROVED", approvedAt: new Date(), approvedById: admin.id } });
  revalidatePath("/admin/submissions");
}
export async function rejectSubmission(id: string, rejectionReason?: string) {
  await requireAdmin();
  if (isDemoMode) {
    revalidatePath("/admin/submissions");
    return { demo: true, message: `Demo mode: ${id} would be rejected.` };
  }

  const { prisma } = await import("@/lib/prisma");
  await prisma.leadSubmission.update({ where: { id }, data: { status: "REJECTED", rejectionReason } });
  revalidatePath("/admin/submissions");
}
export async function updatePassword(formData: FormData) {
  const user = await requireUser();
  const schema = z.object({ password: z.string().min(8), confirm: z.string().min(8) }).refine((v) => v.password === v.confirm, "Passwords must match");
  const parsed = schema.parse(Object.fromEntries(formData));
  if (isDemoMode) return { demo: true, message: "Demo mode: password changes are not saved." };

  const { prisma } = await import("@/lib/prisma");
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(parsed.password, 12) } });
}
export async function finalizePayroll(month: string) {
  const admin = await requireAdmin();
  if (isDemoMode) return { demo: true, message: `Demo mode: payroll for ${month} is preview-only.` };

  const { prisma } = await import("@/lib/prisma");
  const workers = await prisma.user.findMany({ where: { role: "WORKER", isActive: true }, include: { leadSubmissions: { where: { monthKey: month, status: "APPROVED" } } } });
  await Promise.all(workers.map((worker) => { const approvedLeadCount = worker.leadSubmissions.reduce((sum, row) => sum + row.leadCount, 0); const p = calculatePayroll({ approvedLeadCount, baseSalary: Number(worker.baseSalary), simCost: Number(worker.simCost) }); return prisma.payrollRun.upsert({ where: { workerId_monthKey: { workerId: worker.id, monthKey: month } }, update: { ...p, finalizedById: admin.id, finalizedAt: new Date() }, create: { workerId: worker.id, monthKey: month, ...p, finalizedById: admin.id } }); }));
}
