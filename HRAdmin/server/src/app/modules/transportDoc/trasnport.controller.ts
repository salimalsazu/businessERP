/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { transportFilterableFields } from './transport.constants';
import { TransportDocService } from './transport.service';

// !----------------------------------Create New Courier---------------------------------------->>>

const createTransportDoc = catchAsync(async (req: Request, res: Response) => {
  // const profileId = (req.user as IRequestUser).profileId;

  //@ts-ignore
  const result = await TransportDocService.addTransportDoc(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getTransportDoc = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, transportFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await TransportDocService.getTransportDoc(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doc fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateTransportDoc = catchAsync(async (req: Request, res: Response) => {
  const { transportDocId } = req.params;
  //@ts-ignore
  const result = await TransportDocService.updateTransportDoc(transportDocId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

export const TransportDocController = {
  createTransportDoc,
  getTransportDoc,
  updateTransportDoc,
};
