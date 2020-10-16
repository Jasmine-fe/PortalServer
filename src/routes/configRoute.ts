import { Router } from 'express';
import * as config from '../controllers/config.controller'
export const configRouter: Router = Router();

configRouter.get('/template', config.getConfigTemplate)
configRouter.get('/dataList', config.getConfigDataList)
configRouter.get('/data', config.getConfigData)
configRouter.post('/configData/new', config.recordDataConfig)
configRouter.post('/configData/modify', config.setDataConfig)