import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/response';
import { GroupService } from './group.service';

const addGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GroupService.addGroup(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GroupService.getGroup(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const GroupController = {
  addGroup,
  getGroup
};
