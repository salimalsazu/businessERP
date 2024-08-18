import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { RequisitionService } from './requisition.service';
import { RequisitionFilterableFields } from './requisition.constants';

// !----------------------------------Create New Courier---------------------------------------->>>
const createNewRequisition = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log('data', data);
  const result = await RequisitionService.createRequisition(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Requisition added successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getRequisition = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, RequisitionFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await RequisitionService.getRequisition(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food Exp fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Courier---------------------------------------->>>
const updateRequisition = catchAsync(async (req: Request, res: Response) => {
  const { requisitionId } = req.params;
  const payload = req.body;
  const result = await RequisitionService.updateRequisition(requisitionId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

export const RequisitionController = {
  createNewRequisition,
  getRequisition,
  updateRequisition,
};
