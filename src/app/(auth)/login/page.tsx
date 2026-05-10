import { DemoLoginForm } from "@/components/DemoLoginForm";
import { Card } from "@/components/ui";
import { isDemoMode } from "@/lib/demo";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#12315e,#050816_55%)] p-4">
    <Card className="w-full max-w-md">
      <div className="mb-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-600 text-xl font-black">AB</span>
        <h1 className="mt-5 text-3xl font-bold">AFF Bird Payroll</h1>
        <p className="mt-2 text-slate-400">Sign in to continue.</p>
      </div>
      <div className="mb-6">
        <p className="text-xl font-semibold">Welcome back</p>
        <p className="text-sm text-slate-400">Use your email and password.</p>
      </div>
      <DemoLoginForm demoMode={isDemoMode} />
    </Card>
  </main>;
}
