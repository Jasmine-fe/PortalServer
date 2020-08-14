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

  export const recordGameServerIp = async (req: Request, res: Response, next: NextFunction) => {
    const gameListService = new GameListService();
    try {
      const gameContent = await gameListService.recordGameServerIp(req)
      return res.status(HttpStatus.OK).json({ success: true, data: "update success" });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  }

