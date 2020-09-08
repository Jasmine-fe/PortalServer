import { Router } from 'express';
import * as gameList from '../controllers/gameList.controller'
export const gameListRouter: Router = Router();

gameListRouter.get('/list', gameList.getGameList)
gameListRouter.get('/content', gameList.gmaeGameContent)
gameListRouter.get('/progress/list', gameList.getProcessingGames)
gameListRouter.get('/progress/ip', gameList.getProcessingIp)
