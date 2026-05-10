import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD ?? "admin12345", 12);
  const workerPassword = await bcrypt.hash(process.env.SEED_WORKER_PASSWORD ?? "worker12345", 12);
  await prisma.user.upsert({ where: { email: process.env.SEED_ADMIN_EMAIL ?? "admin@affbird.test" }, update: {}, create: { name: "AFF Bird Admin", email: process.env.SEED_ADMIN_EMAIL ?? "admin@affbird.test", passwordHash: adminPassword, role: Role.ADMIN, baseSalary: 0, simCost: 0 } });
  await prisma.user.upsert({ where: { email: "sakilahammed02968@gmail.com" }, update: { name: "MD. SAZEDUL ISLAM", baseSalary: 9000, simCost: 0, isActive: true }, create: { name: "MD. SAZEDUL ISLAM", email: "sakilahammed02968@gmail.com", passwordHash: workerPassword, role: Role.WORKER, baseSalary: 9000, simCost: 0 } });
}
main().finally(() => prisma.$disconnect());
