import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TransactionService } from './transaction.service';
import { TransactionFilterableFields } from './transaction.constants';
import moment from 'moment';

// !----------------------------------Create New Courier---------------------------------------->>>

const createNewTransaction = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await TransactionService.createTransaction(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getTransaction = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TransactionFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await TransactionService.getTransaction(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food Exp fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Courier---------------------------------------->>>
const updateTransaction = catchAsync(async (req: Request, res: Response) => {
  const { requisitionId } = req.params;
  const payload = req.body;
  const result = await TransactionService.updateTransaction(requisitionId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const getSingleTransaction = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const result = await TransactionService.getSingleTransaction(transactionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction fetched successfully',
    data: result,
  });
});

const dailyTransactionCount = catchAsync(async (req: Request, res: Response) => {
  // Extract filters from query parameters
  const filters = {
    month: req.query.month as string,
    year: req.query.year ? Number(req.query.year) : undefined,
  };

  // Check if month and year are provided in the query parameters
  if (!filters.month || !filters.year) {
    filters.month = moment().format('MMMM');
    filters.year = moment().year();
  }

  const result = await TransactionService.dailyTransactionCount(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Daily transaction counts fetched successfully',
    data: result,
  });
});

export const TransactionController = {
  createNewTransaction,
  getTransaction,
  updateTransaction,
  getSingleTransaction,
  dailyTransactionCount,
};
