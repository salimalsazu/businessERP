import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { GroupService } from './group.service';
import { groupFilterableFields } from './group.constants';

const createGroup = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await GroupService.createGroup(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Created successfully',
    data: result,
  });
});

const getAllGroups = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, groupFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await GroupService.getGroups(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All retrieved successfully',
    data: result,
  });
});

const getTrialBalance = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, groupFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await GroupService.getTrialBalance(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All retrieved successfully',
    data: result,
  });
});

export const GroupController = {
  createGroup,
  getAllGroups,
  getTrialBalance,
};
