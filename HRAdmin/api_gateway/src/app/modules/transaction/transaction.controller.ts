import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../../shared/response';
import { TransactionService } from './transaction.service';

const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TransactionService.addTransaction(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getSingleTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TransactionService.getSingleTransaction(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const TransactionController = {
  addTransaction,
  getSingleTransaction
};
