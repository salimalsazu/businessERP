import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { CoreService as HttpService } from "../../../shared/axios";
import exp from "constants";

const getAllSummery = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get("/dashboard/count", {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization,
    },
  });

  return response;
};

export const dashboardService = {
  getAllSummery,
};
