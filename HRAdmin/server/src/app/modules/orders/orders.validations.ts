import { z } from 'zod';
import { isValidISOString } from '../../../shared/utils';

const createOrder = z
  .object({
    orderNo: z.string({
      required_error: 'Order No is required',
      invalid_type_error: 'Order No must be in String',
    }),
    styleNo: z.string({
      required_error: 'Style No is required',
      invalid_type_error: 'Style No must be in String',
    }),
    noOfPack: z
      .number({
        required_error: 'No Of Pack is Required',
        invalid_type_error: 'Number Of Pack must be in Integer',
      })
      .refine(
        value => {
          if (value === undefined) return true;
          return value >= 1 && value <= 20;
        },
        {
          message: 'Number Of Pack must be between 1 and 20',
        }
      ),
    totalPack: z
      .number({
        required_error: 'Total Pack is required',
        invalid_type_error: 'Total Pack must be in Integer',
      })
      .refine(
        value => {
          if (value === undefined) return true;
          return value >= 1;
        },
        {
          message: 'Total Pack must be greater than 0',
        }
      ),
    portId: z.string({
      required_error: 'Port ID is Required',
      invalid_type_error: 'Port ID must be in String',
    }),
    buyerEtd: z
      .string({
        required_error: 'Buyer Etd is required',
        invalid_type_error: 'Buyer ETD must be in Date String',
      })
      .refine(value => isValidISOString(value)),
  })
  .refine(data => {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('All Order field must be provided in the request body');
    }
    return true;
  });
// ! update order details --------------------------------------------
const updateOrder = z.object({
  styleNo: z
    .string({
      invalid_type_error: 'Style Number must be in String',
    })
    .optional(),
  noOfPack: z
    .number({
      invalid_type_error: 'Number Of Pack must be in Integer',
    })
    .optional()
    .refine(
      value => {
        if (value === undefined) return true;
        return value >= 1 && value <= 20;
      },
      {
        message: 'Number Of Pack must be between 1 and 20',
      }
    ),
  totalPack: z
    .number({
      invalid_type_error: 'Total Pack must be in Integer',
    })
    .optional(),
  isActiveOrder: z
    .boolean({
      invalid_type_error: 'Order Status must be in true / false',
    })
    .optional(),
  portId: z
    .string({
      invalid_type_error: 'PortId must be in String',
    })
    .optional(),
  oldFilePath: z
    .string({
      invalid_type_error: 'Old File Path must be in String',
    })
    .optional(),
  buyerEtd: z
    .string({
      invalid_type_error: 'Buyer ETD must be in String',
    })
    .refine(value => isValidISOString(value))
    .optional(),
});

export const OrdersValidation = {
  createOrder,
  updateOrder,
};
