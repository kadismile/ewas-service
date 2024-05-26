import Agenda from 'agenda';

export const agenda = async () => {
  const mongoConnectionString = process.env.MONGODB_URL;
  if (!mongoConnectionString) {
    throw new Error('MONGODB_URL is not defined');
  }

  return new Agenda({
    db: { address: mongoConnectionString, collection: 'jobCollection' },
  });
}
