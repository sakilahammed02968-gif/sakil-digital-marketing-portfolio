import { AddLeadsModal } from "@/components/AddLeadsModal";
import { MonthSelector } from "@/components/MonthSelector";
import { StatCard } from "@/components/StatCard";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { Select } from "@/components/ui";
export default function SubmissionsPage() { return <div className="space-y-6"><div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold">Lead submissions</h1><p className="text-slate-400">Daily entries from My Leads (newest first). Use filters to narrow the table and summary.</p></div><AddLeadsModal /></div><div className="grid gap-4 md:grid-cols-5"><StatCard label="Entries filtered" value="0"/><StatCard label="Leads filtered" value="0"/><StatCard label="Pending rows" value="0"/><StatCard label="Approved rows" value="0"/><StatCard label="Rejected rows" value="0"/></div><div className="grid gap-3 md:grid-cols-2"><Select><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></Select><MonthSelector months={["All months", "2026-05"]}/></div><SubmissionsTable rows={[]}/></div>; }
