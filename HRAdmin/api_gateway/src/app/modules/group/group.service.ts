import { CoreService as HttpService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';
import { Request } from 'express';

const addGroup = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post('/group', req.body, {
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const getGroup = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get('/group', {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

export const GroupService = {
  addGroup,
  getGroup
};
