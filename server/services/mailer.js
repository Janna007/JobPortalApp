// mailer.js

import nodemailer from 'nodemailer'

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'jannakondeth5@gmail.com',
      pass: 'hmsuynfzhpblmooh',
    },
});

// Function to send email
export const sendMail = async (to, subject, text) => {
    console.log("sending...")
  try {
    const info = await transporter.sendMail({
      from: 'jannakondeth5@gmail.com',
      to,
      subject,
      text,
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


