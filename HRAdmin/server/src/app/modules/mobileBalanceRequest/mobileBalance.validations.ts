import { z } from 'zod';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createAsset = z.object({
  assetModel: z
    .string({
      invalid_type_error: 'assetModel must be in String',
      required_error: 'assetModel is Required',
    })
    .refine(value => {
      if (typeof value === 'string') {
        if (value.trim() === '') {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Style No wont be empty or contain only whitespace');
        }
      }
      return true;
    }),
  assetName: z.string({
    required_error: 'assetName is Required',
    invalid_type_error: 'assetName must be in String',
  }),
  assetLocation: z.string({
    required_error: 'assetLocation is Required',
    invalid_type_error: 'assetLocation must be in String',
  }),
  assetCategory: z.string({
    required_error: 'assetCategory is Required',
    invalid_type_error: 'assetCategory must be in String',
  }),
  assetQuantity: z.number({
    required_error: 'assetQuantity is Required',
    invalid_type_error: 'assetQuantity must be in number',
  }),
  purchaseDate: z.string({
    required_error: 'purchaseDate is Required',
    invalid_type_error: 'purchaseDate must be in Date Format',
  }),
});

export const AssetValidation = {
  createAsset,
};
