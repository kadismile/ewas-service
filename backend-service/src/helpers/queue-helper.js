/* import kue from 'kue';
import { createClient } from 'redis';


export const queueHelper = (type, priority, queueData) => {
  const environment = process.env.NODE_ENV
  const queues = kue.createQueue();
  queues
    .create(type, queueData)
    .priority(priority)
    .save()

  const RedisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
  });

  let redisQueue
  if (environment === 'local') {
    redisQueue = kue.createQueue({
      redis: process.env.REDIS_URL
    });
  }
  
  redisQueue = kue.createQueue({
    redis: {
      createClientFactory: function(){
          return RedisClient
      }
    }
  });

} */


import kue from 'kue';
import { createClient } from 'redis';


export const queueHelper = (type, priority, queueData) => {
  const environment = process.env.NODE_ENV
  const queues = kue.createQueue();
  queues
    .create(type, queueData)
    .priority(priority)
    .save()

  const RedisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-11491.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 19612
    }
  });

  let redisQueue
/*   if (environment === 'local') {
    redisQueue = kue.createQueue({
      redis: process.env.REDIS_URL
    });
  } */
  
  redisQueue = kue.createQueue({
    redis: {
      createClientFactory: function(){
          return RedisClient
      }
    }
  });

  return redisQueue
}