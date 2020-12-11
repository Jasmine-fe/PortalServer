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
import { uploadImgFile, uploadZipFile } from './controllers/provider.controller';
import { router as swaggerRouter } from './swagger';
import { jwt } from './auth/jwt';
import { errorHandler } from './auth/errorHandler';

require('dotenv').config();
express.Router().use(cors({origin: '*'}))

const app = express();
app.use(cors({origin: '*'}))
// send file response
app.use(express.static(path.join( __dirname, '/uploads')));

// deal with image file
const uploadImg = multer({ dest: './src/uploads' })
app.post('/provider/image', uploadImg.single('image'), uploadImgFile)

const uploadZip = multer({ dest: './src/uploads' })
app.post('/provider/zip', uploadZip.single('zip'), uploadImgFile)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt token & router
// app.use(jwt());
app.use('/', router);
// swagger path
app.use('/api/docs', swaggerRouter);
app.use(errorHandler);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



// startServer log
const port: number = Number(process.env.PORT) || 3000;
const ip: string = process.env.IP || "0.0.0.0";
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

