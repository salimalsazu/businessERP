import { CoreService as HttpService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';
import { Request } from 'express';

const addTransaction = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.post('/transaction', req.body, {
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const getSingleTransaction = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get(
    `/transaction/${req.params.transactionId}`,
    {
      params: req.query,
      headers: {
        //@ts-ignore
        Authorization: req.headers.authorization
      }
    }
  );

  return response;
};

export const TransactionService = {
  addTransaction,
  getSingleTransaction
};
