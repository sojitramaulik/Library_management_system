import { transporter } from "../config/mailer";

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your Login OTP",
    html: `
      <h2>Login OTP</h2>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};