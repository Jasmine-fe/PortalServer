import { Request, Response ,NextFunction, Router } from 'express';
import { GameService } from '../services/game.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';


export const getGameslist = async (req: Request, res: Response, next: NextFunction) => {
  const gameService = new GameService();
  try {
    const game = await gameService.getAllGameslist(req)
    return res.status(HttpStatus.OK).json({ success: true, data: game });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};


  export const gmaeGameContent = async (req: Request, res: Response, next: NextFunction) => {
    const gameService = new GameService();
    try {
      const gameContent = await gameService.getGameContent(req)
      return res.status(HttpStatus.OK).json({ success: true, data: gameContent });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

  export const getProcessingGames = async (req: Request, res: Response, next: NextFunction) => {
    const gameService = new GameService();
    try {
      const resData = await gameService.getProcessingGames(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

  export const getProcessingGameIp = async (req: Request, res: Response, next: NextFunction) => {
    const gameService = new GameService();
    try {
      const resData = await gameService.getProcessingGameIp(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

  export const getProcessingGameInfo = async (req: Request, res: Response, next: NextFunction) => {
    const gameService = new GameService();
    try {
      const resData = await gameService.getProcessingGameInfo(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

