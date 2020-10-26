import { Router } from 'express';
import * as config from '../controllers/config.controller'
export const configRouter: Router = Router();

configRouter.get('/template', config.getConfigTemplate)
configRouter.get('/data', config.getConfigData)
configRouter.get('/options', config.getOptionData)
configRouter.post('/data/new', config.recordDataConfig)
configRouter.post('/data/modify', config.setDataConfig)