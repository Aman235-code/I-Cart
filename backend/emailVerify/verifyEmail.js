import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = (token, email) => {
  let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailDetails = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Hi There, you have recently visited
    our website and entered your email.
    Please follow the given link to verify your email
    http://localhost:5173/verify/${token}
    Thanks
    `,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
