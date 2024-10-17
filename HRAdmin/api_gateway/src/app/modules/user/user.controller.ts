import { NextFunction, Request, Response } from 'express';
import { authService } from './user.service';
import sendResponse from '../../../shared/response';

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.createUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.getUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.updateUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.deleteUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController
};
