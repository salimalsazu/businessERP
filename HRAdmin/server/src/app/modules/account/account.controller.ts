import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AccountService } from './account.service';
import { accountFilterableFields } from './account.constants';

const createAccount = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log('data', data);
  const result = await AccountService.createAccount(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Account created successfully',
    data: result,
  });
});

const getAllAccount = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, accountFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AccountService.getAccounts(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Account retrieved successfully',
    data: result,
  });
});

const getAccountByName = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, accountFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const accountName = req.params.accountName;
  const result = await AccountService.getAccountByName(accountName, filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account retrieved successfully',
    data: result,
  });
});

const deleteAccountController = catchAsync(async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const result = await AccountService.deleteAccount(accountId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account deleted successfully',
    data: result,
  });
});

export const AccountController = {
  createAccount,
  getAllAccount,
  getAccountByName,
  deleteAccountController,
};
