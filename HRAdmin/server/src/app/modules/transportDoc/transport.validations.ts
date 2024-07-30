import { z } from 'zod';

const docStatusEnum = z.enum(['Valid']); // Add more statuses if needed

const TransportDoc = z.object({
  transportDocId: z.string().optional(), // Assuming it's optional during creation
  docName: z.string({
    invalid_type_error: 'docName must be a string',
    required_error: 'docName is required',
  }),
  docNumber: z.string({
    invalid_type_error: 'docNumber must be a string',
    required_error: 'docNumber is required',
  }),
  note: z.string({
    invalid_type_error: 'note must be a string',
    required_error: 'note is required',
  }),
  docStatus: docStatusEnum.default('Valid'),
  docExpiryDate: z.string({
    invalid_type_error: 'docExpiryDate must be a string',
    required_error: 'docExpiryDate is required',
  }),
  vehicleId: z.string({
    invalid_type_error: 'vehicleId must be a string',
    required_error: 'vehicleId is required',
  }),
  createdAt: z.date().optional(), // Assuming it's set automatically
  updatedAt: z.date().optional(), // Assuming it's set automatically
});

const TransportUpdateDoc = z
  .object({
    transportDocId: z.string().optional(),
    docName: z
      .string({
        invalid_type_error: 'docName must be a string',
      })
      .optional(),
    docNumber: z
      .string({
        invalid_type_error: 'docNumber must be a string',
      })
      .optional(),
    note: z
      .string({
        invalid_type_error: 'note must be a string',
      })
      .optional(),
    docStatus: docStatusEnum.default('Valid').optional(),
    docExpiryDate: z
      .string({
        invalid_type_error: 'docExpiryDate must be a string',
      })
      .optional(),
    vehicleId: z
      .string({
        invalid_type_error: 'vehicleId must be a string',
      })
      .optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .partial();

export const TransportValidation = {
  TransportDoc,
  TransportUpdateDoc,
};
