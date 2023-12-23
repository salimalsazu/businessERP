import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { TackPackService } from './tackPack.service';

// !----------------------------------Create New TackPack---------------------------------------->>>
const createTackPack = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await TackPackService.createTackPack(profileId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TackPack created successfully',
    data: result,
  });
});
// !----------------------------------get Single  TackPack Details---------------------------------------->>>
const getSingleTackPack = catchAsync(async (req: Request, res: Response) => {
  const tackPackId = req?.params?.tackPackId;

  const result = await TackPackService.getSingleTackPack(tackPackId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TackPack Retrieved Successfully',
    data: result,
  });
});
// !---------------------------------- Update  TackPack ---------------------------------------->>>
const updateTackPack = catchAsync(async (req: Request, res: Response) => {
  const styleNo = req?.params?.styleNo;
  const profileId = (req.user as IRequestUser).profileId;

  const result = await TackPackService.updateTackPack(profileId, styleNo, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TackPack Updated Successfully',
    data: result,
  });
});

export const TackPackController = {
  createTackPack,
  getSingleTackPack,
  updateTackPack,
};
