import { AddLeadsModal } from "@/components/AddLeadsModal";
import { MonthSelector } from "@/components/MonthSelector";
import { StatCard } from "@/components/StatCard";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { Select } from "@/components/ui";
import { demoLeadSubmissions } from "@/lib/demo";

const workerRows = demoLeadSubmissions.map(({ worker, workerId, ...row }) => row);
const leadTotal = workerRows.reduce((sum, row) => sum + row.leads, 0);
const countByStatus = (status: string) => workerRows.filter((row) => row.status === status).length;

export default function SubmissionsPage() {
  return <div className="space-y-6">
    <div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold">Lead submissions</h1><p className="text-slate-400">Daily entries from My Leads (newest first). Use filters to narrow the table and summary.</p></div><AddLeadsModal /></div>
    <div className="grid gap-4 md:grid-cols-5"><StatCard label="Entries filtered" value={String(workerRows.length)}/><StatCard label="Leads filtered" value={String(leadTotal)}/><StatCard label="Pending rows" value={String(countByStatus("PENDING"))}/><StatCard label="Approved rows" value={String(countByStatus("APPROVED"))}/><StatCard label="Rejected rows" value={String(countByStatus("REJECTED"))}/></div>
    <div className="grid gap-3 md:grid-cols-2"><Select><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></Select><MonthSelector months={["All months", "2026-05"]}/></div>
    <SubmissionsTable rows={workerRows}/>
  </div>;
}
