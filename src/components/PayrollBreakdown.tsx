import { calculatePayroll, formatBDT } from "@/lib/payroll";
import { Card } from "@/components/ui";
export function PayrollBreakdown({ leads, baseSalary, simCost, projected = true }: { leads: number; baseSalary: number; simCost: number; projected?: boolean }) {
  const p = calculatePayroll({ approvedLeadCount: leads, baseSalary, simCost });
  const rows = [["Base salary", formatBDT(p.baseSalary)], ["Lead count", String(p.approvedLeadCount)], ["Lead rate", formatBDT(p.leadRate)], ["Gross", formatBDT(p.gross)], ["Pension 5%", `-${formatBDT(p.pension)}`], ["SIM cost monthly", `-${formatBDT(p.simCost)}`], ["Net payable", formatBDT(p.netPayable)]];
  return <Card><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Live payroll breakdown</h2><span className="text-xs text-blue-300">{projected ? "Projected" : "Approved"}</span></div><div className="space-y-3">{rows.map(([k,v], i) => <div key={k} className="flex justify-between border-b border-slate-800 pb-2 last:border-0"><span className="text-slate-400">{k}</span><span className={i >= 4 && i <= 5 ? "text-red-300" : i === 6 ? "font-bold text-green-300" : "text-white"}>{v}</span></div>)}</div></Card>;
}
