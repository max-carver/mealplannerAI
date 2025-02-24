"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/formSchemas";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
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

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: true,
      message: "Invalid credentials",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      error: false,
      message: "Verification email sent!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/generate-meal-plan",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: true, message: "Invalid credentials" };
      }
      if (error.type === "AccessDenied") {
        return {
          error: true,
          message: "Something went wrong",
        };
      }
    }
    console.log(error);
    throw error;
  }
}
