import { Router } from 'express';
import * as gameList from '../controllers/gameList.controller'
export const gameListRouter: Router = Router();

gameListRouter.get('/list', gameList.getGameList)
gameListRouter.get('/content', gameList.gmaeGameContent)
gameListRouter.post("/gameServer", gameList.recordGameServerIp)