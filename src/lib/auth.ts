import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDemoLogin, isDemoMode } from "@/lib/demo";

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [CredentialsProvider({
    name: "Email and password",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      const parsed = credentialsSchema.safeParse(credentials);
      if (!parsed.success) return null;

      if (isDemoMode) {
        return getDemoLogin(parsed.data.email, parsed.data.password) as never;
      }

      const { prisma } = await import("@/lib/prisma");
      const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
      if (!user?.isActive) return null;
      const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
      if (!valid) return null;
      return { id: user.id, name: user.name, email: user.email, role: user.role } as never;
    }
  })],
  callbacks: {
    jwt({ token, user }) { if (user) token.role = (user as { role?: string }).role; return token; },
    session({ session, token }) { if (session.user) { session.user.id = token.sub ?? ""; session.user.role = String(token.role ?? "WORKER"); } return session; }
  }
};
