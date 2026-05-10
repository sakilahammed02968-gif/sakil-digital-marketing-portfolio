import { Card } from "@/components/ui";
import { demoPayrollHistory } from "@/lib/demo";
import { formatBDT } from "@/lib/payroll";

const totalPension = demoPayrollHistory.reduce((sum, row) => sum + row.pension, 0);
const totalNet = demoPayrollHistory.reduce((sum, row) => sum + row.netPayable, 0);

export default function HistoryPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Payroll History</h1><p className="text-slate-400">All your finalized monthly payroll runs.</p></div><div className="grid gap-4 md:grid-cols-2"><Card><p className="text-slate-400">Pension collected so far</p><p className="mt-2 text-2xl font-bold text-red-300">{formatBDT(totalPension)}</p></Card><Card><p className="text-slate-400">Net paid so far</p><p className="mt-2 text-2xl font-bold text-green-300">{formatBDT(totalNet)}</p></Card></div><div className="overflow-auto rounded-2xl border border-slate-800"><table className="w-full min-w-[800px] text-sm"><thead className="bg-navy-800 text-slate-300"><tr>{["Month","Base","Sales / leads","Commission","Lead cost","SIM cost","Pension","Net","Status"].map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr></thead><tbody>{demoPayrollHistory.map((row) => <tr key={row.month} className="border-t border-slate-800 bg-navy-900"><td className="p-3">{row.month}</td><td className="p-3">{formatBDT(row.baseSalary)}</td><td className="p-3">{row.approvedLeadCount}</td><td className="p-3">{formatBDT(row.leadCommission)}</td><td className="p-3">{formatBDT(row.leadRate)}</td><td className="p-3 text-red-300">-{formatBDT(row.simCost)}</td><td className="p-3 text-red-300">-{formatBDT(row.pension)}</td><td className="p-3 text-green-300">{formatBDT(row.netPayable)}</td><td className="p-3">{row.status}</td></tr>)}</tbody></table></div></div>;
}
