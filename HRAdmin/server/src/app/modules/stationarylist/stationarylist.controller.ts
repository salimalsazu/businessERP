import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StationaryAssignFilterableFields, StationaryListFilterableFields } from './stationarylist.constants';
import { StationaryItemListService } from './stationaryIist.service';

// !----------------------------------Create New Courier---------------------------------------->>>
const createStationaryList = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await StationaryItemListService.createStationaryItemList(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stationary Added successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getAllStationaryList = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StationaryListFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await StationaryItemListService.getAllStationaryItemList(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Stationary items fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Create New Courier---------------------------------------->>>
const createStationaryAssignList = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await StationaryItemListService.createStationaryAssignList(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stationary Assign successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getAllStationaryAssign = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StationaryAssignFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await StationaryItemListService.getAllStationaryAssignList(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Stationary Assign fetched successfully',
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

export const StationaryListController = {
  createStationaryList,
  getAllStationaryList,
  createStationaryAssignList,
  getAllStationaryAssign,
};
