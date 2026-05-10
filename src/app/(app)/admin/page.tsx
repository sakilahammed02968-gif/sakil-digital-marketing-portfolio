import { StatCard } from "@/components/StatCard";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { formatBDT } from "@/lib/payroll";
const rows = [{ id: "1", worker: "MD. SAZEDUL ISLAM", day: "2026-05-10", month: "2026-05", source: "Craigslist", leads: 0, status: "PENDING", submitted: "Just now" }];
export default function AdminPage() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-slate-400">Operational overview for submissions and payroll.</p></div><div className="grid gap-4 md:grid-cols-4"><StatCard label="Total workers" value="1"/><StatCard label="Pending submissions" value="0"/><StatCard label="Approved leads this month" value="0"/><StatCard label="Payroll payable this month" value={formatBDT(8550)}/></div><h2 className="font-semibold">Recent submissions</h2><SubmissionsTable rows={rows} admin /></div>; }
