import { createConnection } from 'typeorm';

const opt = {
  "type": "mysql",
  "host": "192.168.43.196",
  "username": "kitty",
  "password": "pink",
  "port": "3306",
  "database": "gamedb",
  "timeout": 15000,
  "connectTimeout": 15000,
  "acquireTimeout": 15000,
  "entities": [
      "src/entities/*.ts"
   ],
   "migrations": [
      "src/migration/*.ts"
   ],
   "subscribers": [
    "src/subscriber/*.ts"
   ]
}


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