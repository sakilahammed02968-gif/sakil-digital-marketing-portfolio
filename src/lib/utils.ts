import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function firstName(name?: string | null) { return name?.split(/[ .]+/).find(Boolean) ?? "there"; }
export const demoUser = { id: "demo-worker", name: "MD. SAZEDUL ISLAM", email: "sakilahammed02968@gmail.com", role: "WORKER", baseSalary: 9000, simCost: 0 };
export const demoAdmin = { id: "demo-admin", name: "AFF Bird Admin", email: "admin@affbird.test", role: "ADMIN" };
