import { Router } from 'express';
import * as connection from '../controllers/connection.controller'


export const connectRouter: Router = Router();

connectRouter.get('/', connection.connectedGameServerIp)
connectRouter.post('/recordIp', connection.connectedGameServerIp)
