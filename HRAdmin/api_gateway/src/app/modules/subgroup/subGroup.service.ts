import { CoreService as HttpService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';
import { Request } from 'express';

const addSubGroup = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post('/subGroup', req.body, {
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const getSubGroup = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get('/subGroup', {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

export const SubGroupService = {
  addSubGroup,
  getSubGroup
};
