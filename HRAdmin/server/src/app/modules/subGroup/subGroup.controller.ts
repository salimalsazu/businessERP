import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SubGroupService } from './subGroup.service';
import { subGroupFilterableFields } from './subGroup.constants';
const createSubGroup = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await SubGroupService.createSubGroup(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Created successfully',
    data: result,
  });
});

const getAllSubGroups = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, subGroupFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await SubGroupService.getSubGroups(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All retrieved successfully',
    data: result,
  });
});

export const SubGroupController = {
  createSubGroup,
  getAllSubGroups,
};
