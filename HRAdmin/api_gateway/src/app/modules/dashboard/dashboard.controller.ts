import { NextFunction, Request, Response } from "express";
import { dashboardService } from "./dashboard.service";
import sendResponse from "../../../shared/response";

const getAllSummery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await dashboardService.getAllSummery(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const dashboardController = {
  getAllSummery,
};
