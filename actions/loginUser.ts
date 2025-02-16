"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/formSchemas";
import { db } from "@/prisma/db";
import { AuthError } from "next-auth";
import * as z from "zod";

export default async function loginUser(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser && !existingUser.password) {
    return {
      error: true,
      message: "Invalid login method.",
    };
  }

  // if (!existingUser?.emailVerified) {
  //   return { error: true, message: "Email not verified" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: true, message: "Invalid credentials" };
      }
    }
    return { error: true, message: "Something went wrong" };
  }
}
