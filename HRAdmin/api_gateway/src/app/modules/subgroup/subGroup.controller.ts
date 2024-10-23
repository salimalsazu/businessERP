import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/response';
import { SubGroupService } from './subGroup.service';

const addSubGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SubGroupService.addSubGroup(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getSubGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SubGroupService.getSubGroup(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const SubGroupController = {
  addSubGroup,
  getSubGroup
};
