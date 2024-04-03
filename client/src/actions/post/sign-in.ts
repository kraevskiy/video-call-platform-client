"use server";

import { SignInInputs, SignInValidationSchema } from "@/types/forms";
import getUserByEmail from "@/actions/get/get-user-by-email";
import { signIn as authSignIn } from "@/../auth";
import { AuthError } from "next-auth";

export default async function signIn({
  data,
  callbackURL,
}: {
  data: SignInInputs;
  callbackURL?: string;
}) {
  const validateResult = SignInValidationSchema.safeParse(data);
  if (!validateResult.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validateResult.data;
  const user = await getUserByEmail(email);
  if (!user || !user.password || !user.email) {
    return { error: "User not found!" };
  }

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: callbackURL,
    });
  } catch (e) {
    console.log(e);

    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw e;
  }
}
