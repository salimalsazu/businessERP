import { Salary } from '@prisma/client';
import { z } from 'zod';

// Enum for SalaryMonth
const SalaryMonth = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

// Zod validation schema for Salary
const createSalary = z.object({
  body: z.object({
    salaryId: z.string().uuid().optional(), // Generated by default, so it's optional in the schema
    salaryMonth: SalaryMonth,
    salaryYear: z.string().length(4, 'Year must be 4 digits long'),
    userId: z.string(),
    absentDeduction: z.number().min(0),
    advanceSalaryDeduction: z.number().min(0),
    mealAndMobileBillDeduction: z.number().min(0),
  }),
});

export const SalaryValidation = {
  createSalary,
};
