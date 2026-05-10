import { Card } from "@/components/ui";
export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) { return <Card><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold text-white">{value}</p>{hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}</Card>; }
