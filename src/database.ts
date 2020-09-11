import { createConnection } from 'typeorm';


export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    host: "192.168.43.196",
    port: 3306,
    username: "kitty",
    password: "pink",
    database: "gamedb",
    entities: [
      __dirname + "/entities/*.ts"
    ],
    synchronize: true,
    logging: false,
  })
  .then(res => {
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("DB connection error!!", err)
  })
};