import { z } from 'zod';

const createTransaction = z.object({
  body: z.object({
    transactionDate: z.string().nonempty({ message: 'Transaction date is required.' }),
    transactionType: z.string().nonempty({ message: 'Transaction type is required.' }),
    transactionAmount: z.number().refine(value => value > 0, { message: 'Transaction amount must be a positive number.' }),
    transactionDescription: z.string().nonempty({ message: 'Transaction description is required.' }),
    debitAccountId: z.string().nonempty({ message: 'Debit Account is required.' }),
    creditAccountId: z.string().nonempty({ message: 'Credit Account is required.' }),
  }),
});

export const TransactionValidation = {
  createTransaction,
};
