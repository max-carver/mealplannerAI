"use server";

import { RegisterSchema } from "@/lib/formSchemas";
import { generateVerificationToken } from "@/lib/tokens";
import { db } from "@/prisma/db";
import bcryptjs from "bcryptjs";
import * as z from "zod";

export default async function registerUser(
  values: z.infer<typeof RegisterSchema>
) {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: true, message: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: true, message: "Enter a unique email address" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    return { error: false, message: "Verification email sent!" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return { error: true, message: "Something went wrong" };
  }
}
