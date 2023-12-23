import { z } from 'zod';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCourier = z.object({
  body: z
    .object({
      courierName: z.string({
        required_error: 'Courier Name is required',
        invalid_type_error: 'Courier Name must be in String',
      }),
      awbNo: z.string({
        required_error: 'Awb No. is required',
        invalid_type_error: 'Awb No. must be in String',
      }),
      courierDate: z
        .string({
          required_error: 'Courier Date is required',
          invalid_type_error: 'Courier Date must be in Date String',
        })
        .optional(),
      courierDetails: z.string({
        required_error: 'Courier Details is required',
        invalid_type_error: 'Courier Details must be in String',
      }),
      styleNo: z.string({
        required_error: 'Style Number is required',
        invalid_type_error: 'Style Number must be in String',
      }),
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('All Required Data must be provided in the request body');
      }
      return true;
    }),
});

const updateCourier = z.object({
  body: z
    .object({
      styleNo: z
        .string({
          invalid_type_error: 'Style No must be in String',
        })
        .optional(),
      courierName: z
        .string({
          invalid_type_error: 'Courier Name must be in String',
        })
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(httpStatus.BAD_REQUEST, 'Courier Name must not be empty or contain only whitespace');
            }
          }
          return true;
        })
        .optional(),
      awbNo: z
        .string({
          invalid_type_error: 'Awb No. must be in String',
        })
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(httpStatus.BAD_REQUEST, 'AWB no. must not be empty or contain only whitespace');
            }
          }
          return true;
        })
        .optional(),
      courierDate: z
        .string({
          invalid_type_error: 'Courier Date must be in Date String',
        })
        .optional(),
      courierDetails: z
        .string({
          invalid_type_error: 'Courier Details must be in String',
        })
        .refine(value => {
          if (typeof value === 'string') {
            if (value.trim() === '') {
              throw new ApiError(httpStatus.BAD_REQUEST, 'Courier Details must not be empty or contain only whitespace');
            }
          }
          return true;
        })
        .optional(),
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('At least one data must be provided');
      }
      return true;
    }),
});

export const CourierValidation = {
  createCourier,
  updateCourier,
};
