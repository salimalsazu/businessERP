import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { CoreService as HttpService } from "../../../shared/axios";

const getUserService = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get("/users", {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization,
    },
  });
  return response;
};

const updateUserService = async (req: Request): Promise<IGenericResponse> => {
  const { id } = req.params;
  const response: IGenericResponse = await HttpService.patch(
    `/users/update-user/${id}`,
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

const deleteUserService = async (req: Request): Promise<IGenericResponse> => {
  const { id } = req.params;
  const response: IGenericResponse = await HttpService.delete(`/users/${id}`, {
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization,
    },
  });
  return response;
};

export const userService = {
  getUserService,
  updateUserService,
  deleteUserService,
};
