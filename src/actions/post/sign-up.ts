"use server";

import { SignUpInputs, SignUpValidationSchema } from "@/types/forms";
import getUserByEmail from "@/actions/get/get-user-by-email";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export default async function SignUp(data: SignUpInputs) {
  const validateResult = SignUpValidationSchema.safeParse(data);
  if (!validateResult.success) {
    return { error: "Invalid fields!" };
  }
  const { name, email, password } = validateResult.data;
  const userExist = await getUserByEmail(email);
  if (userExist) {
    return { error: "Email already taken!" };
  }

  const hashedPassword = await hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully!" };
}
