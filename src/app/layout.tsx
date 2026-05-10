import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AFF Bird Payroll", description: "Payroll and lead tracking dashboard for AFF Bird" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
