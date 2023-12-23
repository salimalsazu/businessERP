import { z } from 'zod';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createStyle = z.object({
  styleNo: z
    .string({
      invalid_type_error: 'Style No must be in String',
      required_error: 'Style No is Required',
    })
    .refine(value => {
      if (typeof value === 'string') {
        if (value.trim() === '') {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Style No wont be empty or contain only whitespace');
        }
      }
      return true;
    }),
  itemId: z.string({
    required_error: 'Item ID is Required',
    invalid_type_error: 'Item id must be in String',
  }),
  fabric: z
    .string({
      required_error: 'Fabric is Required',
      invalid_type_error: 'Fabric must be in String',
    })
    .refine(value => {
      if (typeof value === 'string') {
        if (value.trim() === '') {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Fabric wont not be empty or contain only whitespace');
        }
      }
      return true;
    }),
});

const updateStyle = z
  .object({
    itemId: z.string({ invalid_type_error: 'Item ID must be in String' }).optional(),
    fabric: z
      .string({ invalid_type_error: 'Fabric must be in String' })
      .refine(value => {
        if (typeof value === 'string') {
          if (value.trim() === '') {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Fabric must not be empty or contain only whitespace');
          }
        }
        return true;
      })
      .optional(),
    isActiveStyle: z
      .boolean({
        invalid_type_error: 'Is active Style must be between true or false',
      })
      .optional(),
    factoryId: z
      .string({
        invalid_type_error: 'Factory ID must be in String',
      })
      .optional(),
    oldFilePath: z
      .string({
        invalid_type_error: 'Old File Path must be in String',
      })
      .optional(),
  })
  .optional();

const factoryStyleAssign = z.object({
  body: z.object({
    factoryId: z.string({
      required_error: 'Factory Id is Required',
      invalid_type_error: 'Factory ID must be in String',
    }),
    styleNo: z.string({
      required_error: 'Style No is Required',
      invalid_type_error: 'Style No must be in String',
    }),
  }),
});

export const StylesValidation = {
  createStyle,
  updateStyle,
  factoryStyleAssign,
};
