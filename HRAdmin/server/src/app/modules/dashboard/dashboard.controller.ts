import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DashboardService } from './dashboard.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getSummeryController = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getAllSummery();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting Data successfully',
    data: result,
  });
});

export const DashboardController = {
  getSummeryController,
};
