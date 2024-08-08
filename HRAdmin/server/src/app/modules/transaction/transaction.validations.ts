import { z } from 'zod';

const ChequeType = z.enum(['Cash', 'Cheque']);

const createTransaction = z.object({
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

export const RequisitionValidation = {
  createTransaction,
};
