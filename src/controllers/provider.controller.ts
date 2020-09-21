import { Request, Response ,NextFunction, Router } from 'express';
import { ProviderService } from '../services/provider.service';
import { ApiResponseError } from '../interfaces/ApiResponseError';
import * as HttpStatus from 'http-status-codes';

export const uploadImgFile = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      await providerService.uploadImgFile(req)
      return res.status(HttpStatus.OK).json({ success: true });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};

export const uploadZipFile = async (req: any, res: Response, next: NextFunction) => {
  const providerService = new ProviderService();
  try {
    await providerService.uploadZipFile(req)
    return res.status(HttpStatus.OK).json({ success: true });
  } catch (err) {
    const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
    return next(error);
  }
};


  export const getImgFile = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      const resData = await providerService.getImgFile(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData});
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };
  
  export const createNewGame = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      const resData = await providerService.createNewGame(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };

// modify Config api
  export const modifyConfig = async (req: any, res: Response, next: NextFunction) => {
    const providerService = new ProviderService();
    try {
      const resData = await providerService.createNewGame(req)
      return res.status(HttpStatus.OK).json({ success: true, data: resData });
    } catch (err) {
      const error: ApiResponseError = { code: HttpStatus.BAD_REQUEST, errorObj: err };
      return next(error);
    }
  };

  