export type Tier = { min: number; max: number | null; rate: number; label: string };
export const LEAD_TIERS: Tier[] = [
  { min: 0, max: 500, rate: 14, label: "0–500 leads" },
  { min: 501, max: 1000, rate: 16, label: "501–1,000 leads" },
  { min: 1001, max: 1500, rate: 18, label: "1,001–1,500 leads" },
  { min: 1501, max: 2000, rate: 21, label: "1,501–2,000 leads" },
  { min: 2001, max: null, rate: 24, label: "2,001+ leads" }
];
export const DEFAULT_BASE_SALARY = 9000;
export const PENSION_RATE = 0.05;
export function getLeadTier(approvedLeadCount: number) {
  return LEAD_TIERS.find((tier) => approvedLeadCount >= tier.min && (tier.max === null || approvedLeadCount <= tier.max)) ?? LEAD_TIERS[0];
}
export function getNextTier(leadCount: number) { return LEAD_TIERS.find((tier) => leadCount < tier.min) ?? null; }
export function calculatePayroll(input: { approvedLeadCount: number; baseSalary?: number; simCost?: number }) {
  const approvedLeadCount = Math.max(0, Math.trunc(input.approvedLeadCount));
  const baseSalary = input.baseSalary ?? DEFAULT_BASE_SALARY;
  const simCost = input.simCost ?? 0;
  const leadRate = getLeadTier(approvedLeadCount).rate;
  const leadCommission = approvedLeadCount * leadRate;
  const gross = baseSalary + leadCommission;
  const pension = Number((gross * PENSION_RATE).toFixed(2));
  const netPayable = Number((gross - pension - simCost).toFixed(2));
  return { approvedLeadCount, baseSalary, leadRate, leadCommission, gross, pension, simCost, netPayable };
}
export function monthKey(date = new Date()) { return date.toISOString().slice(0, 7); }
export function formatBDT(value: number) { return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 2 }).format(value); }
