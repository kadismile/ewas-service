import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import nodemailer from "nodemailer";
import { queueHelper } from '../helpers/queue-helper.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Mailer {
  
  FROM_EMAIL = process.env.FROM_EMAIL;
  FROM_NAME = process.env.FROM_NAME;
  REDIS_URL = process.env.REDIS_URL
  SMTP_HOST = process.env.SMTP_HOST ?? '';
  SMTP_PORT = parseInt(process.env.SMTP_PORT ?? '587', 10);
  SMTP_USER = process.env.SMTP_USER ?? '';
  SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? '';

  transporter = nodemailer.createTransport({
    host: this.SMTP_HOST,
    port: this.SMTP_PORT,
    auth: {
      user: this.SMTP_USER,
      pass: this.SMTP_PASSWORD,
    },
  });


  async sendMail(type , templateName) {
    const self = this
    const filePath = path.join(__dirname, `../email-templates/${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const emailTemplate = handlebars.compile(source);
    try {
      let queue = queueHelper(type, 'high')
      queue.process(type, function (job, done) {
        const emailData = job.data
        emailData.year =  new Date().getFullYear()
        const message = {
          from: `${self.FROM_NAME} <${self.FROM_EMAIL}>`,
          // to: emailData.email,
          to: 'ikadismile@gmail.com',
          subject: emailData.subject,
          html: emailTemplate(emailData)
        };
        self.transporter.sendMail(message);
        done()
      })
    } catch (e) {
      throw e
    }
  }
}

export const MailHelper = new Mailer();
