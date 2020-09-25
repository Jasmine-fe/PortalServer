import { Router } from 'express';
import * as game from '../controllers/game.controller'
export const gameRouter: Router = Router();

gameRouter.get('/list', game.getGameslist)
gameRouter.get('/content', game.gmaeGameContent)
gameRouter.get('/progress/list', game.getProcessingGames)
gameRouter.get('/progress/ip', game.getProcessingGameIp)
gameRouter.get('/progress/info', game.getProcessingGameInfo)
