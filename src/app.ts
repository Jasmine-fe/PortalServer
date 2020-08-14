import 'dotenv/config';
import "reflect-metadata";
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as WebSocket from 'ws';
import * as http from 'http';
import { connectDB } from './database'
import { router } from './routes/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



// startServer log
const port: Number = Number(process.env.PORT) || 3000;
const startServer = async () => {
  await server.listen(port, () => {
    
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
     // send IP address
      ws.send("'127.0.0.1'");
    });

    console.log(`
        Server running on http://localhost:${port}
    `);
  });
};

// connect MySQL dataBase
(async () => {
  await connectDB();
  await startServer();
})();

