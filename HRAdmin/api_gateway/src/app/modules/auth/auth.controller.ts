import sendResponse from "../../../shared/response";
import { authService } from "./auth.service";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.createUserService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const longInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.refreshToken(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  createUser,
  longInUser,
  refreshToken,
};
