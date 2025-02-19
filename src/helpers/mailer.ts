/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars

const genHtml = (hashedToken: any, emailType: any) => {
  return emailType === "VERIFY"
    ? `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to verify your email or copy and paste the link below in your browser<br/>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    : `<p>Click <a href='${process.env.DOMAIN}/reset?token=${hashedToken}'>here</a> to reset your password or copy and paste the link below in your browser<br/>${process.env.DOMAIN}/reset?token=${hashedToken}</p>`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //  confirg mail for usuage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "faec5f947ee944",
        pass: "449bb2404b1ad4",
      },
    });

    const mailOptions = {
      from: "deepguru649@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: genHtml(hashedToken, emailType),
    };

    const mailRes = await transporter.sendMail(mailOptions);
    return mailRes;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message);
  }
};
