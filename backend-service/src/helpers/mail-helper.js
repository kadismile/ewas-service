import path from 'path';
import { Queue, Worker } from "bullmq";
import fs from 'fs';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import nodemailer from "nodemailer";
import Agenda from 'agenda';


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


  async sendMail(type , templateName, data) {
    const self = this
    const filePath = path.join(__dirname, `../email-templates/${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const emailTemplate = handlebars.compile(source);
    try {
      const message = {
        from: `${self.FROM_NAME} <${self.FROM_EMAIL}>`,
        to: data.email,
        subject: data.subject,
        html: emailTemplate(data)
      };

    const mongoConnectionString = process.env.MONGODB_URL;
    if (!mongoConnectionString) {
      throw new Error('MONGODB_URL is not defined');
    }

    const agenda = new Agenda({
      db: { address: mongoConnectionString, collection: 'jobCollection' },
    });


    agenda.define('Send Mail', async (job) => {
      const { message } = job.attrs.data;
      await triggerMail(message);
    });
    await agenda.start();

    await agenda.schedule('in 20 seconds', 'Send Mail', message);

    console.log('Agenda started and job scheduled');

    const triggerMail = async () => {
      self.transporter.sendMail(message);
    }
    } catch (e) {
      throw e
    }
  }
}

export const MailHelper = new Mailer();
