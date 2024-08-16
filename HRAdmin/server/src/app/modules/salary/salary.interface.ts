

export type IRequisitionFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type ISalaryCreateRequest = {
  salaryMonth: string;
  salaryYear: string;
  userId: string;
  absentDeduction: number;
  advanceSalaryDeduction: number;
  mealAndMobileBillDeduction: number;
};

