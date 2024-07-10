import { z } from 'zod';

const addAccount = z.object({
  accountName: z.string().nonempty({ message: 'Product Name is required' }),
});

export const AccountValidation = {
  addAccount,
};
