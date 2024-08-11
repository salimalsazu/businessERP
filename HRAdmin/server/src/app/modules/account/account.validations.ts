import { z } from 'zod';

const addAccount = z.object({
  body: z.object({
    accountName: z.string().nonempty({ message: 'Product Name is required' }),
    openingBalance: z.number().nonnegative({ message: 'Opening Balance must be zero or a positive number' }),
    closingBalance: z.number().nonnegative({ message: 'Closing Balance must be zero or a positive number' }),
  }),
});

export const AccountValidation = {
  addAccount,
};
