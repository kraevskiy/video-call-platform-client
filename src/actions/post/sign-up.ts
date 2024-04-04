"use server";

import { SignUpInputs, SignUpValidationSchema } from "@/types/forms";
import getUserByEmail from "@/actions/get/get-user-by-email";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export default async function signUp(data: SignUpInputs) {
  const validationResult = SignUpValidationSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid fields !" };
  }
  const { email, name, password } = validationResult.data;
  const candidate = await getUserByEmail(email);
  if (candidate) {
    return { error: "Email already taken !" };
  }

  const hashedPassword = await hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully !" };
}
