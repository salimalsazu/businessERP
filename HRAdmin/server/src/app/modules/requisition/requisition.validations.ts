import { z } from 'zod';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const ChequeType = z.enum(['Cash', 'Cheque']);

const createRequisition = z.object({
  body: z.object({
    requisitionDate: z.string(),
    accountId: z.string(),
    details: z.string(),
    bankName: z.string(),
    chequeNo: z.string(),
    chequeDate: z.string(),
    amount: z.number(),
    amountType: ChequeType,
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

export const RequisitionValidation = {
  createRequisition,
  updateCourier,
};
