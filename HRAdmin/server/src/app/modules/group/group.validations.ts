import { z } from 'zod';

const addGroup = z.object({
  body: z.object({
    groupName: z.string().nonempty({ message: 'Group Name is required' }),
    tbType: z.string().nonempty({ message: 'Type is required' }),
  }),
});

export const GroupValidation = {
  addGroup,
};
