import { Router } from 'express';
import * as connection from '../controllers/connection.controller'


export const connectRouter: Router = Router();

connectRouter.get('/', connection.connectedGameServerIp)
connectRouter.post('/status', connection.updateConnectStatus)
connectRouter.post('/recordip', connection.recordGameServerIp)
