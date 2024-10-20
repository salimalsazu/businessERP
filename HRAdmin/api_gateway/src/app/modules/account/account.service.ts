import { CoreService as HttpService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';
import { Request } from 'express';

const getAccount = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get('/account', {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const getAccountByName = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get(`/account/${req.params.accountName}`, {
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });

  return response;
};

export const accountService = {
  getAccount,
  getAccountByName
};
