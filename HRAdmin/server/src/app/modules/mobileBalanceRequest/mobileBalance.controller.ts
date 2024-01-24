/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { MobileBillFilterableFields } from './mobileBalance.constants';
import { MobileBalanceLimitService } from './mobileBalance.service';
import { IRequestUser } from '../users/user.interface';

// !----------------------------------Create New Courier---------------------------------------->>>
const addMobileBalanceLimit = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IRequestUser)?.userId;

  const body = req.body;

  const result = await MobileBalanceLimitService.addMobileBalanceLimit(userId, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mobile Bill Created Successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getMobileBalanceLimit = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, MobileBillFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await MobileBalanceLimitService.getMobileBalanceLimit(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mobile bill fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// // !----------------------------------get Single Courier---------------------------------------->>>
// const getSingleCourier = catchAsync(async (req: Request, res: Response) => {
//   const { courierId } = req.params;
//   const result = await CourierService.getSingleCourier(courierId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Courier retrieved successfully',
//     data: result,
//   });
// });
// // !----------------------------------Update Courier---------------------------------------->>>
// const updateCourierInformation = catchAsync(async (req: Request, res: Response) => {
//   const { courierId } = req.params;
//   const payload = req.body;
//   const result = await CourierService.updateCourierInformation(courierId, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Courier Updated successfully !',
//     data: result,
//   });
// });
// // !----------------------------------get all Courier---------------------------------------->>>
// const getStyleWiseNoOfCourier = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, StyleWiseCourierFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

//   const result = await CourierService.getStyleWiseNoOfCourier(filters, options);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Courier fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

export const MobileBalanceLimitController = {
  addMobileBalanceLimit,
  getMobileBalanceLimit,
};