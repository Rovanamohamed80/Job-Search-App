import { createTransport } from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";

const transporter = createTransport({
  service:"gmail",
  auth: {
    user: "rovanam425@gmail.com",
    pass: "mpkr ihid gdbx yule",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async function sendOurEmail(recoveryEmail,OTPCode,userName) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"hello our user" <rovanam425@gmail.com>', // sender address
    to: recoveryEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(OTPCode,userName), // html body
  });

}

