import { SalaryMonth } from '@prisma/client';

export type ISalaryFilterRequest = {
  searchTerm?: string | undefined;
  salaryMonth?: SalaryMonth | undefined;
  salaryYear?: string | undefined;
};
export type ISalaryCreateRequest = {
  salaryMonth: string;
  salaryYear: string;
  userId: string;
  absentDeduction: number;
  advanceSalaryDeduction: number;
  mealAndMobileBillDeduction: number;
};
