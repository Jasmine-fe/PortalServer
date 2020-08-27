import { createConnection } from 'typeorm';

export const connectDB = async () => {
  await createConnection()
  .then(res => {
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("DB connection error!!", err)
  })
};