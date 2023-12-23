import { z } from 'zod';

const createTackPack = z
  .object({
    styleNo: z.string({
      required_error: 'Style No is required',
      invalid_type_error: 'Style No must be in String',
    }),
    tackPackComment: z.string({
      required_error: 'Tack Pack Comment is required',
      invalid_type_error: 'Tack Pack Comment must be in String',
    }),
  })
  .refine(data => {
    const keys = Object.keys(data);

    if (keys.length === 0) {
      throw new Error('All Required Data must be provided in the request body');
    }
    return true;
  });

const updateTackPack = z.object({
  tackPackComment: z.string({
    invalid_type_error: 'Tack Pack Comment must be in String',
  }),
});

export const TackPackValidation = {
  createTackPack,
  updateTackPack,
};
