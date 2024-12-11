import mongoose from 'mongoose';
const url = process.env.MONGODB_URL

export const DBconnection = async () => {
  const options = {
    dbName: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  if (options.user === '') delete options.user;
  if (options.pass === '') delete options.pass;

  await mongoose.connect(url, options);
  console.log('connected to MongoDB...');
};
