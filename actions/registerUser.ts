"use server";

import { RegisterSchema } from "@/lib/formSchemas";
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

    return { error: false, message: "User created successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return { error: true, message: "Something went wrong" };
  }
}
