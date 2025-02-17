import { Resend } from "resend";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.mydomain.com"
    : "http://localhost:3000";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "⚡Verify Your Email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`,
  });
};

export default resend;
