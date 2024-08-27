import { z } from 'zod';

const addSubGroup = z.object({
  body: z.object({
    subGroupName: z.string().nonempty({ message: 'Sub Group Name is required' }),
    subGroupDescription: z.string().nonempty({ message: 'Group Description is required' }),
    groupId: z.string().nonempty({ message: 'Group Id is required' }),
  }),
});

export const SubGroupValidation = {
  addSubGroup,
};
