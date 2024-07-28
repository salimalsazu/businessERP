/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FuelListService } from './fuelList.service';
import { FuelListFilterableFields } from './fuelList.constants';

// !----------------------------------Create New Courier---------------------------------------->>>
const createFuelList = catchAsync(async (req: Request, res: Response) => {
  const result = await FuelListService.createFuelList(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Cost Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const GetFuelList = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FuelListFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FuelListService.GetFuelList(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Assets fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateFuelList = catchAsync(async (req: Request, res: Response) => {
  const { fuelListId } = req.params;
  const payload = req.body;
  const result = await FuelListService.updateFuelList(payload, fuelListId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Cost Updated Successfully',
    data: result,
  });
});

export const FuelListController = {
  createFuelList,
  GetFuelList,
  updateFuelList,
};
