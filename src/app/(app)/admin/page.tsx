import { StatCard } from "@/components/StatCard";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { demoApprovedLeads, demoLeadSubmissions, demoPayroll } from "@/lib/demo";
import { formatBDT } from "@/lib/payroll";

const pendingRows = demoLeadSubmissions.filter((row) => row.status === "PENDING");

export default function AdminPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-slate-400">Operational overview for submissions and payroll.</p></div><div className="grid gap-4 md:grid-cols-4"><StatCard label="Total workers" value="1"/><StatCard label="Pending submissions" value={String(pendingRows.length)}/><StatCard label="Approved leads this month" value={String(demoApprovedLeads)}/><StatCard label="Payroll payable this month" value={formatBDT(demoPayroll.netPayable)}/></div><h2 className="font-semibold">Recent submissions</h2><SubmissionsTable rows={demoLeadSubmissions} admin /></div>;
}
