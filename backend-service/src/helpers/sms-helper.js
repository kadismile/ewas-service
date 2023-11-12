import twilio from 'twilio';
import { queueHelper } from './queue-helper.js';


const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (body, recipients) => {
  const type = 'sendSms'; 
  let queue = queueHelper(type, 'high')
  queue.process(type, async function (job, done) {
    try {
      for (let phoneNumber of recipients) {
        await client.messages
        .create({
          body,
          from: '+15005550006',
          to: '+2347067875047'
        })
        done(null);
      }
    } catch (error) {
      console.error('Error processing job:', error);
      done(error);
    }
  }) 

  queue.on('job complete', async function (id) {
    console.log(`Job ${id} SMS sent:`);
  });

}
