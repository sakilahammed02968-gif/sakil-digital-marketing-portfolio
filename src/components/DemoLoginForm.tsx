"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button, Input } from "@/components/ui";

const demoAccounts = [
  { label: "Preview as worker", email: "sakilahammed02968@gmail.com", password: "worker12345", callbackUrl: "/dashboard" },
  { label: "Preview as admin", email: "admin@affbird.test", password: "admin12345", callbackUrl: "/admin" }
];

export function DemoLoginForm({ demoMode }: { demoMode: boolean }) {
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [password, setPassword] = useState(demoAccounts[0].password);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const login = (nextEmail = email, nextPassword = password, callbackUrl = "/dashboard") => {
    setError("");
    startTransition(async () => {
      const result = await signIn("credentials", { email: nextEmail, password: nextPassword, redirect: false, callbackUrl });
      if (result?.ok) {
        window.location.href = result.url ?? "/dashboard";
        return;
      }
      setError(demoMode ? "Use one of the demo accounts shown below." : "Invalid email or password.");
    });
  };

  return <div className="space-y-4">
    {demoMode ? <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
      <p className="font-semibold">Temporary demo mode is on.</p>
      <p className="mt-1 text-blue-100/80">No PostgreSQL database is required. Use a quick preview button or the mock credentials.</p>
    </div> : null}
    <form onSubmit={(event) => { event.preventDefault(); login(); }} className="space-y-4">
      <label className="block text-sm">Email<Input name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2" /></label>
      <label className="block text-sm">Password<Input name="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2" /></label>
      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>{isPending ? "Signing in..." : "Sign in"}</Button>
    </form>
    {demoMode ? <div className="grid gap-2 sm:grid-cols-2">
      {demoAccounts.map((account) => <Button
        key={account.email}
        type="button"
        className="bg-slate-700 hover:bg-slate-600"
        disabled={isPending}
        onClick={() => { setEmail(account.email); setPassword(account.password); login(account.email, account.password, account.callbackUrl); }}
      >{account.label}</Button>)}
    </div> : null}
    {demoMode ? <div className="rounded-2xl border border-slate-800 bg-navy-950 p-4 text-xs text-slate-300">
      <p><span className="font-semibold text-white">Worker:</span> sakilahammed02968@gmail.com / worker12345</p>
      <p className="mt-1"><span className="font-semibold text-white">Admin:</span> admin@affbird.test / admin12345</p>
    </div> : null}
  </div>;
}
