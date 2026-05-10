import { AddLeadsModal } from "@/components/AddLeadsModal";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { TierTable } from "@/components/TierTable";
import { Card } from "@/components/ui";
import { demoApprovedLeads, demoLeadSubmissions, demoMonth, demoPayroll } from "@/lib/demo";
import { formatBDT, getLeadTier, getNextTier } from "@/lib/payroll";

const workerRows = demoLeadSubmissions.map(({ worker, workerId, ...row }) => row);

export default function MyLeadsPage() {
  const leads = demoApprovedLeads;
  const next = getNextTier(leads);
  return <div className="space-y-6">
    <div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold">My leads</h1><p className="text-slate-400">Use Add leads to log counts by source and day. Entries need admin approval before they count toward payroll and tiers.</p></div><AddLeadsModal /></div>
    <Card className="grid gap-4 md:grid-cols-5"><div><p className="text-slate-400">Current month</p><p className="font-semibold">{demoMonth}</p></div><div><p className="text-slate-400">Approved leads</p><p className="font-semibold">{leads}</p></div><div><p className="text-slate-400">This month earnings</p><p className="font-semibold">{formatBDT(demoPayroll.leadCommission)}</p></div><div><p className="text-slate-400">Current tier</p><p className="font-semibold">{getLeadTier(leads).label}</p></div><div><p className="text-slate-400">Next tier</p><p className="font-semibold">{next ? `${next.label} · ${formatBDT(next.rate)}` : "Top tier"}</p></div></Card>
    <Card><h2 className="mb-4 font-semibold">This month</h2><SubmissionsTable rows={workerRows}/></Card>
    <TierTable leads={leads}/>
  </div>;
}
