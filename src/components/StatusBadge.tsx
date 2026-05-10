import { cn } from "@/lib/utils";
export function StatusBadge({ status }: { status: string }) {
  const color = status === "APPROVED" || status === "PAID" ? "border-green-500/30 bg-green-500/10 text-green-300" : status === "REJECTED" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  return <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", color)}>{status.toLowerCase()}</span>;
}
