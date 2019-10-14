require("dotenv").config();

const nodemailer = require("nodemailer");
const htmlToText = require('nodemailer-html-to-text').htmlToText;

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.NODEMAILER_USER}`,
    pass: `${process.env.NODEMAILER_PASSWORD}`
  }
});

transporter.use('compile', htmlToText());

module.exports = transporter;