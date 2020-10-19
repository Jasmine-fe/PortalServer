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

export const getConfigData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new ConfigService();
    const resData = await loginService.getConfigData(req)
    return res.status(HttpStatus.OK).json({ success: true, data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};


export const recordDataConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new ConfigService();
    const resData = await loginService.recordDataConfig(req)
    return res.status(HttpStatus.OK).json({ success: true });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};

export const setDataConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new ConfigService();
    const resData = await loginService.setDataConfig(req)
    return res.status(HttpStatus.OK).json({ success: true });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};