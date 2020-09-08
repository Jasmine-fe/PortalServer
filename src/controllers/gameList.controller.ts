import { Request, Response ,NextFunction, Router } from 'express';
import { GameListService } from '../services/gameList.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';


export const getGameList = async (req: Request, res: Response, next: NextFunction) => {
  const gameListService = new GameListService();
  try {
    const gameList = await gameListService.getAllGameList(req)
    return res.status(HttpStatus.OK).json({ success: true, data: gameList });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};


  export const gmaeGameContent = async (req: Request, res: Response, next: NextFunction) => {
    const gameListService = new GameListService();
    try {
      const gameContent = await gameListService.getGameContent(req)
      return res.status(HttpStatus.OK).json({ success: true, data: gameContent });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

  export const getProcessingGames = async (req: Request, res: Response, next: NextFunction) => {
    const gameListService = new GameListService();
    try {
      const resData = await gameListService.getProcessingGames(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

  export const getProcessingIp = async (req: Request, res: Response, next: NextFunction) => {
    const gameListService = new GameListService();
    try {
      const resData = await gameListService.getProcessingIp(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }