import { db } from "@/prisma/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verificationToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1800 * 1000);

  const excistingToken = await getVerificationTokenByEmail(email);

  if (excistingToken) {
    await db.verificationToken.delete({
      where: { id: excistingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
