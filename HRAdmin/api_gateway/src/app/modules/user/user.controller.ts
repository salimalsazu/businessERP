import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/response";
import { userService } from "./user.service";

const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.getUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.updateUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.deleteUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getUserController,
  updateUserController,
  deleteUserController,
};
