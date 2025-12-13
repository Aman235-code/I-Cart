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
    text: "Node.js testing mail for GeeksforGeeks",
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
