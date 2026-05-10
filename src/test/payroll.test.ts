import { describe, expect, it } from "vitest";
import { calculatePayroll, getLeadTier } from "@/lib/payroll";
describe("payroll calculations", () => {
  it.each([[0, 14], [500, 14], [501, 16], [1001, 18], [1501, 21], [2001, 24]])("uses monthly tier rate for %i leads", (leads, rate) => {
    expect(getLeadTier(leads).rate).toBe(rate);
  });
  it("calculates commission, gross, pension, and net", () => {
    expect(calculatePayroll({ approvedLeadCount: 600, baseSalary: 9000, simCost: 100 })).toEqual({ approvedLeadCount: 600, baseSalary: 9000, leadRate: 16, leadCommission: 9600, gross: 18600, pension: 930, simCost: 100, netPayable: 17570 });
  });
});
