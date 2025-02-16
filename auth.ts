import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/prisma/db";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;

      token.role = user.role;

      return token;
    },

    async session({ token, session }) {
      console.log(token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
