import twilio from 'twilio';
import { Queue, Worker } from "bullmq";
import { redisConnection } from '../lib/redis-connection.js';


const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (body, recipients) => {
  const jobName = 'sendSms-job'; 
  const jobData = JSON.stringify({ body, recipients });
  const imageQueue = new Queue(jobName, { connection: redisConnection });
  imageQueue.add(jobName, jobData);

  const worker = new Worker(jobName, async (job) => {
    const { body, recipients } = JSON.parse(job.data)
    for (let phoneNumber of recipients) {
      await client.messages
      .create({
        body,
        from: '+15005550006',
        to: '+2347067875047'
      })
      done(null);
    }
  }, {
    connection: redisConnection,
  });

  worker.on("failed", (job, err) => {
    console.error(`Image upload job failed for job ${job.id}:`, err);
  });

  worker.on('complete', async function (id) {
    console.log(`Job ${id} SMS sent:`);
  });

}
