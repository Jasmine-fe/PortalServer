import { Router } from 'express';
import * as provider from '../controllers/provider.controller'
export const providerRouter: Router = Router();

providerRouter.post('/', provider.sendImgFile)
