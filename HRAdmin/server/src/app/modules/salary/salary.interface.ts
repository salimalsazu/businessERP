import { SalaryMonth } from '@prisma/client';

export type ISalaryFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  SalaryMonth?: SalaryMonth | undefined;
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
