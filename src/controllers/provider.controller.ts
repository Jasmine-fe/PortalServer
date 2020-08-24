import { Request, Response ,NextFunction, Router } from 'express';
import { ProviderService } from '../services/provider.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const uploadImgFile = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      const resData = await providerService.uploadImgFile(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };

  export const sendImgFile = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      const filePath = await providerService.sendImgFile(req)
      res.status(HttpStatus.OK).json({ success: true });
      return res.sendFile('../uploads/531d42162d6b7adb9f5d9884e80dd055');
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };
  