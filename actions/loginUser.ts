"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/formSchemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export default async function loginUser(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { error: true, message: "Invalid credentials" };
    }
    throw error;
  }
}
