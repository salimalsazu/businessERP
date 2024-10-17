import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { CoreService as HttpService } from "../../../shared/axios";

const createUserService = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post(
    "/auth/create-user",
    req.body,
    {
      headers: {
        //@ts-ignore
        Authorization: req.headers.authorization,
      },
    }
  );

  return response;
};

const loginUser = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post(
    "/auth/login",
    req.body
  );

  return response;
};

const refreshToken = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post(
    "/auth/refresh-token",
    req.cookies
  );

  return response;
};

export const authService = {
  createUserService,
  loginUser,
  refreshToken,
};
