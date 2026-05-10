import { MonthSelector } from "@/components/MonthSelector";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { Button, Input, Select } from "@/components/ui";
import { demoLeadSubmissions } from "@/lib/demo";

export default function AdminSubmissionsPage() {
  return <div className="space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Admin submissions</h1><p className="text-slate-400">View all worker submissions, edit counts before approval, approve, reject, or bulk approve pending rows.</p></div><Button>Bulk approve selected</Button></div><div className="grid gap-3 md:grid-cols-4"><Input placeholder="Worker"/><Select><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></Select><Select><option>All sources</option><option>Craigslist</option><option>Facebook</option></Select><MonthSelector /></div><SubmissionsTable rows={demoLeadSubmissions} admin /></div>;
}
