const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

exports.sendRegistrationEmail = (email, firstName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "merngems@gmail.com",
      pass: "zxwh ggoi jyls svap",
    },
  });

  fs.readFile("email-greeting.html", "utf8", (err, html) => {
    if (err) {
      console.error("❌ Error reading HTML file:", err);
      return;
    }

    html = html.replace("{{ firstName }}", firstName);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to React Gems",
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error:", error.message);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });
  });
};

exports.sendOrderConfirmationEmail = (email, firstName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "merngems@gmail.com",
      pass: "zxwh ggoi jyls svap",
    },
  });

  fs.readFile("email-order-confirmation.html", "utf8", (err, html) => {
    if (err) {
      // console.error("❌ Error reading HTML file:", err);
      return;
    }

    html = html.replace("{{ firstName }}", firstName);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation",
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error:", error.message);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });
  });
};
