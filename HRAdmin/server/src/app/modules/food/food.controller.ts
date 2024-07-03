import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FoodExpFilterableFields, StyleWiseCourierFilterableFields } from './food.constants';
import { FoodExpService } from './food.service';

// !----------------------------------Create New Courier---------------------------------------->>>
const createNewFoodExp = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await FoodExpService.createNewFoodExp(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses added successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getFoodExpDaily = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FoodExpFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FoodExpService.getFoodExpDaily(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food Exp fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getAllFoodExpMonthly = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FoodExpFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FoodExpService.getFoodExpMonthly(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Monthly Expenses Fetched successfully',
    data: result,
  });
});


export const FoodExpController = {
  createNewFoodExp,
  getFoodExpDaily,
  getAllFoodExpMonthly
};
