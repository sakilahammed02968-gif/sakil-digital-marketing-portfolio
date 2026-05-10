import { calculatePayroll, monthKey } from "@/lib/payroll";

export const isDemoMode = process.env.AFF_BIRD_DEMO_MODE === "true" || (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL);

export const demoUser = {
  id: "demo-worker",
  name: "MD. SAZEDUL ISLAM",
  email: "sakilahammed02968@gmail.com",
  password: "worker12345",
  role: "WORKER",
  baseSalary: 9000,
  simCost: 0
} as const;

export const demoAdmin = {
  id: "demo-admin",
  name: "AFF Bird Admin",
  email: "admin@affbird.test",
  password: "admin12345",
  role: "ADMIN",
  baseSalary: 0,
  simCost: 0
} as const;

export const demoMonth = "2026-05";

export const demoLeadSubmissions = [
  { id: "demo-sub-1", workerId: demoUser.id, worker: demoUser.name, day: "2026-05-01", month: demoMonth, source: "Facebook", leads: 80, status: "APPROVED", submitted: "May 1, 2026" },
  { id: "demo-sub-2", workerId: demoUser.id, worker: demoUser.name, day: "2026-05-03", month: demoMonth, source: "Craigslist", leads: 55, status: "APPROVED", submitted: "May 3, 2026" },
  { id: "demo-sub-3", workerId: demoUser.id, worker: demoUser.name, day: "2026-05-08", month: demoMonth, source: "Facebook", leads: 40, status: "PENDING", submitted: "May 8, 2026" },
  { id: "demo-sub-4", workerId: demoUser.id, worker: demoUser.name, day: "2026-05-09", month: demoMonth, source: "Craigslist", leads: 12, status: "REJECTED", submitted: "May 9, 2026" }
];

export const demoApprovedLeads = demoLeadSubmissions
  .filter((row) => row.status === "APPROVED")
  .reduce((sum, row) => sum + row.leads, 0);

export const demoPendingLeads = demoLeadSubmissions
  .filter((row) => row.status === "PENDING")
  .reduce((sum, row) => sum + row.leads, 0);

export const demoProjectedLeads = demoApprovedLeads + demoPendingLeads;

export const demoPayroll = calculatePayroll({
  approvedLeadCount: demoApprovedLeads,
  baseSalary: demoUser.baseSalary,
  simCost: demoUser.simCost
});

export const demoProjectedPayroll = calculatePayroll({
  approvedLeadCount: demoProjectedLeads,
  baseSalary: demoUser.baseSalary,
  simCost: demoUser.simCost
});

export const demoPayrollHistory = [
  {
    month: monthKey(new Date(Date.UTC(2026, 3, 1))),
    ...calculatePayroll({ approvedLeadCount: 130, baseSalary: demoUser.baseSalary, simCost: demoUser.simCost }),
    status: "PAID"
  },
  {
    month: monthKey(new Date(Date.UTC(2026, 2, 1))),
    ...calculatePayroll({ approvedLeadCount: 95, baseSalary: demoUser.baseSalary, simCost: demoUser.simCost }),
    status: "PAID"
  }
];

export function getDemoLogin(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const user = [demoAdmin, demoUser].find((account) => account.email === normalizedEmail && account.password === password);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
