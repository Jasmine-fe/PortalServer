import { Request, Response ,NextFunction, Router } from 'express';
import { GameListService } from '../services/gameList.service';
import * as HttpStatus from 'http-status-codes';
import { ApiResponseError } from '../interfaces/ApiResponseError';

export const getGameList = async (req: Request, res: Response, next: NextFunction) => {
    console.log("gameListRouter get in controoler")
    const gameListService = new GameListService();
    try {
      const gameList = await gameListService.getAllGameList()
      return res.status(HttpStatus.OK).json({
        success: true,
        data: gameList
      });
    } catch (err) {
      const error: ApiResponseError = {
        code: HttpStatus.BAD_REQUEST,
        errorObj: err
      };
      return next(error);
    }
  };