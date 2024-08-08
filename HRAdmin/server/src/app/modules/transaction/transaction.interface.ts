import { ChequeType, RequisitionStatus } from '@prisma/client';

export type ITransactionFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type ITransactionCreateRequest = {
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

export type ITransactionUpdateRequest = {
  styleNo?: string;
  courierName?: string;
  awbNo?: string;
  courierDate?: Date;
  courierDetails?: string;
};
