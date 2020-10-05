import { Request, Response, NextFunction, Router } from 'express';
import { ConfigService } from '../services/config.service' ;
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const getConfigTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new ConfigService();
    const resData = await loginService.getConfigTemplate(req)
    return res.status(HttpStatus.OK).json({ success: true, data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};
