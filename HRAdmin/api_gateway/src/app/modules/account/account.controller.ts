import { NextFunction, Request, Response } from 'express';
import { accountService } from './account.service';
import sendResponse from '../../../shared/response';

const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await accountService.getAccount(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getAccountByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await accountService.getAccountByName(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const accountController = {
  getAccount,
  getAccountByName
};
