import { Select } from "@/components/ui";
export function MonthSelector({ months = ["2026-05", "2026-04", "2026-03"] }: { months?: string[] }) { return <Select aria-label="Month">{months.map(m => <option key={m}>{m}</option>)}</Select>; }
