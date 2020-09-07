import { Request, Response, NextFunction, Router } from 'express';
import { LoginService } from '../services/login.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const userLoginJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new LoginService();
    const resData = await loginService.userLoginJWT(req)
    return res.status(HttpStatus.OK).json({ success: true, data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};


export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginService = new LoginService();
    const resData = await loginService.userRegister(req)
    return res.status(HttpStatus.OK).json({ success: true, data: resData });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};