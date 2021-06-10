import transporter from './nodemailer';

const Email = {
  async sendWithNodemailer(options: any) {
    return transporter.sendMail(options);
  },
};

export default Email;
