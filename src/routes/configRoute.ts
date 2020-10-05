import { Router } from 'express';
import * as config from '../controllers/config.controller'
export const configRouter: Router = Router();

configRouter.get('/template', config.getConfigTemplate)