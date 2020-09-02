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
const port: number = Number(process.env.PORT) || 3000;
const ip: string = "0.0.0.0";
const startServer = async () => {
  await server.listen(port, ip, () => {
    console.log(` Server running on http://${ip}:${port}`);
  });
};

// connect MySQL dataBase
(async () => {
  await connectDB();
  await startServer();
})();

