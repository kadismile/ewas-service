import kue from 'kue';
import { createClient } from 'redis';


export const queueHelper = (type, priority) => {
  const environment = process.env.NODE_ENV
  const queues = kue.createQueue();
  queues
    .create(type)
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

  return redisQueue
}