import 'dotenv/config';
import "reflect-metadata";
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as WebSocket from 'ws';
import * as http from 'http';
import * as multer from 'multer';
import * as cors from 'cors';
import { connectDB } from './database'
import { router } from './routes/index';
import { getGameServerIp } from './services/connect.service';
import { uploadImgFile, sendImgFile } from './controllers/provider.controller'; 
import  { router as swaggerRouter }  from './swagger';
express.Router().use(cors({origin: '*'}))

const app = express();

// send file response
// app.use(express.static(__dirname + '/uploads'));

// deal with image file
// const upload = multer({ dest: './src/uploads' })
// app.post('/provider', upload.single('image'), uploadImgFile)
// app.get('/provider', sendImgFile)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);
app.use('/api/docs', swaggerRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



// startServer log
const port: Number = Number(process.env.PORT) || 3000;
const startServer = async () => {
  await server.listen(port, () => {
    

    // websocket
    wss.on('connection',  function connection(ws) {
      ws.on('message', async function incoming(message) {
        console.log('received: %s', message);

        // send IP address
        const gameServer = await getGameServerIp();
        console.log("gameServer",gameServer)
        if(gameServer) {
          
            ws.send(`${gameServer["ip"]}`);  
        } else {
            ws.send(null);
        }
      });
      ws.send("hello websocket server");
    });

    console.log(` Server running on http://localhost:${port}`);
  });
};

// connect MySQL dataBase
(async () => {
  await connectDB();
  await startServer();
})();

