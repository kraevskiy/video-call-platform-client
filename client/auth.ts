import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const {
  signIn,
  signOut,
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
