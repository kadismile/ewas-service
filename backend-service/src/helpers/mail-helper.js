import path from 'path';
import { Queue, Worker } from "bullmq";
import fs from 'fs';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import nodemailer from "nodemailer";


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
      const jobData = JSON.stringify(data);
      const imageQueue = new Queue(type, { connection: redisConnection });
      imageQueue.add(type, jobData);

      const worker = new Worker(type, (job) => {
        const emailData = JSON.parse(job.data)
        emailData.year =  new Date().getFullYear();
        const message = {
          from: `${self.FROM_NAME} <${self.FROM_EMAIL}>`,
          to: emailData.email,
          subject: emailData.subject,
          html: emailTemplate(emailData)
        };
        self.transporter.sendMail(message);
      }, {
        connection: redisConnection,
      });
  
    worker.on("failed", (job, err) => {
      console.error(`Image upload job failed for job ${job.id}:`, err);
    });
    } catch (e) {
      throw e
    }
  }
}

export const MailHelper = new Mailer();
