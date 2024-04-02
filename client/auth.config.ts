import Google from "@auth/core/providers/google";
import Github from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { SignInValidationSchema } from "@/types/forms";
import getUserByEmail from "@/actions/get/get-user-by-email";
import { compare } from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateResult = SignInValidationSchema.safeParse(credentials);
        if (!validateResult.success) {
          return null;
        }
        const { email, password } = validateResult.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }
        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
