"use server";

import { RegisterSchema } from "@/lib/formSchemas";

import * as z from "zod";

export default async function registerUser(
  values: z.infer<typeof RegisterSchema>
) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  // Simulate a 5 second delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log(validatedFields.data);
}
