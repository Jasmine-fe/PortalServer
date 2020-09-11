import { Router } from 'express';
import * as provider from '../controllers/provider.controller'
export const providerRouter: Router = Router();


providerRouter.get('/image', provider.sendImgFile)
providerRouter.post('/game', provider.createNewGame)
