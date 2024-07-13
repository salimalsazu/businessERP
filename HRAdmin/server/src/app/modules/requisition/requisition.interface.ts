import { ChequeType, RequisitionStatus } from '@prisma/client';

export type IRequisitionFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type IRequisitionCreateRequest = {
  requisitionDate: Date;
  accountId: string;
  details: string;
  bankName: string;
  chequeNo: string;
  chequeDate: Date;
  amount: number;
  amountType: ChequeType;
  status: RequisitionStatus;
};

export type ICourierUpdateRequest = {
  styleNo?: string;
  courierName?: string;
  awbNo?: string;
  courierDate?: Date;
  courierDetails?: string;
};

export type IStyleWiseCourier = {
  styleNo: string;
  _count: {
    couriers: number;
  };
};

export type IMonthlyFoodExpData = {
  firstName: string;
  lastName: string;
  month: string;
  totalMeal: number;
  mealRate: number;
  perEmployeeCost: number;
};
