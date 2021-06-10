import nodemailer from 'nodemailer';
import * as secrets from '../../config/secrets';

const transporter = nodemailer.createTransport({
  // host: 'smtp.mailtrap.io',
  host: 'mail.google.com',
  service: 'gmail',

  // port: 2525,
  port: 465,

  auth: {
    user: secrets.EMAIL_FROM,
    pass: secrets.EMAIL_PASSWORD,
  },
  secure: false,
});

export default transporter;
