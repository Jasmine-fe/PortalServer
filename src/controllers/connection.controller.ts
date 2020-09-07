import { Request, Response ,NextFunction, Router } from 'express';
import { ConnectService } from '../services/connect.service';
import { GameListService } from '../services/gameList.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const connectedGameServerIp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connectService = new ConnectService();
    const resData = await connectService.getConnectedGameServerIp(req)
    return res.status(HttpStatus.OK).json({ data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};

export const recordGameServerIp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connectService = new ConnectService();
    const resData = await connectService.recordGameServerIp(req)
    return res.status(HttpStatus.OK).json({ success: true, data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
}
