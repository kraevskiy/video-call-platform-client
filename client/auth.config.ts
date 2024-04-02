import Google from "@auth/core/providers/google";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [Google({})],
} satisfies NextAuthConfig;
