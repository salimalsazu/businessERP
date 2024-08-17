import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SalaryFilterableFields } from './salary.constants';
import { SalaryService } from './salary.service';

// !----------------------------------Create New Courier---------------------------------------->>>
const createSalary = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await SalaryService.createSalary(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary added successfully',
    data: result,
  });
});

// !----------------------------------get all Courier---------------------------------------->>>
const getSalary = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SalaryFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SalaryService.getSalary(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Courier---------------------------------------->>>
const updateSalary = catchAsync(async (req: Request, res: Response) => {
  const { salaryId } = req.params;
  const payload = req.body;
  const result = await SalaryService.updateSalary(salaryId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

export const SalaryController = {
  createSalary,
  getSalary,
  updateSalary,
};
