"use server";

import { getVerificationTokenByToken } from "@/lib/verificationToken";
import { db } from "@/prisma/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: true, message: "No token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: true, message: "Token expired" };
  }

  const user = await db.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!user) {
    return { error: true, message: "Email not found" };
  }

  const hasVerified = user.emailVerified;

  if (hasVerified) {
    return { error: true, message: "Email already verified" };
  }

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { error: false, message: "Email verified" };
};
