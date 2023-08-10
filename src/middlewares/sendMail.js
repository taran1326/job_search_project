import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Create a transporter for sending emails
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codingninjas2k16@gmail.com",
    pass: "slwvvlczduktvhdj",
  },
});

// Read the email template from file
const data = fs.readFileSync(
  path.resolve("src", "public", "html", "mailTemplate.html")
);

/**
 * Middleware to send a confirmation email to the user.
 * Sends an email with a predefined template to acknowledge job application.
 * @param {string} userEmail - Email address of the user.
 */
export const sendConfirmationMail = async (userEmail) => {
  const message = {
    from: "codingninjas2k16@gmail.com",
    to: userEmail,
    subject: "Job Application Received",
    html: data,
  };

  // Send the email using the configured transporter
  transporter.sendMail(message, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // Email sent successfully
    }
  });
};
