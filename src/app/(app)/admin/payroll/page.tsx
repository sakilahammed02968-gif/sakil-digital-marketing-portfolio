import { MonthSelector } from "@/components/MonthSelector";
import { Button, Card } from "@/components/ui";
import { demoPayroll, demoUser } from "@/lib/demo";
import { formatBDT } from "@/lib/payroll";

export default function AdminPayrollPage() {
  const p = demoPayroll;
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Admin Payroll</h1><p className="text-slate-400">Preview approved-lead payroll, finalize a month, and mark runs as paid.</p></div><Card className="flex flex-wrap items-center gap-3"><div className="w-48"><MonthSelector /></div><Button>Preview payroll</Button><Button>Finalize payroll month</Button><Button className="bg-green-600 hover:bg-green-500">Mark payroll as paid</Button></Card><div className="overflow-auto rounded-2xl border border-slate-800"><table className="w-full min-w-[900px] text-sm"><thead className="bg-navy-800"><tr>{["Worker","Approved leads","Lead rate","Base","Commission","Gross","Pension","SIM cost","Net payable","Status"].map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr></thead><tbody><tr className="bg-navy-900"><td className="p-3">{demoUser.name}</td><td className="p-3">{p.approvedLeadCount}</td><td className="p-3">{formatBDT(p.leadRate)}</td><td className="p-3">{formatBDT(p.baseSalary)}</td><td className="p-3">{formatBDT(p.leadCommission)}</td><td className="p-3">{formatBDT(p.gross)}</td><td className="p-3 text-red-300">-{formatBDT(p.pension)}</td><td className="p-3 text-red-300">-{formatBDT(p.simCost)}</td><td className="p-3 text-green-300">{formatBDT(p.netPayable)}</td><td className="p-3">Preview</td></tr></tbody></table></div></div>;
}
