import { Request } from 'express';
import { IGenericResponse } from '../../../interfaces/common';
import { CoreService as HttpService } from '../../../shared/axios';
import exp from 'constants';

const getAllSummery = async (req: Request): Promise<IGenericResponse> => {
  const response: IGenericResponse = await HttpService.get('/dashboard/count', {
    params: req.query,
    headers: {
      //@ts-ignore
      Authorization: req.headers.authorization
    }
  });

  return response;
};

const getDailyTransactionCount = async (req: Request): Promise<IGenericResponse> => {
  try {
    const response: IGenericResponse = await HttpService.get('/transaction/daily', {
      params: req.query,
      headers: {
        //@ts-ignore
        Authorization: req.headers.authorization
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching daily transaction count:', error);
    throw new Error('Unable to fetch daily transaction count'); // You can customize the error handling as needed
  }
};

export const dashboardService = {
  getAllSummery,
  getDailyTransactionCount
};
