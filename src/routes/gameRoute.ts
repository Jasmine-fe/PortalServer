import { Router } from 'express';
import { getGameList } from '../controllers/gameList.controller'
export const gameListRouter: Router = Router();

gameListRouter.get('/', getGameList )