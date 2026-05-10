import { getServerSession } from "next-auth";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { authOptions } from "@/lib/auth";
import { demoUser } from "@/lib/utils";
export default async function AppLayout({ children }: { children: React.ReactNode }) { const session = await getServerSession(authOptions); const user = session?.user ?? demoUser; return <div><AppSidebar role={user.role}/><div className="min-h-screen md:pl-64"><Topbar user={user}/><main className="p-4 md:p-8">{children}</main></div></div>; }
