import { Request, Response ,NextFunction, Router } from 'express';
import { LoginService } from '../services/login.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginService = new LoginService();
      const resData = await loginService.checkLogin(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };
  