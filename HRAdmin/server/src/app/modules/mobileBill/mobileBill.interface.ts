export type IMobileBillFilterRequest = {
  searchTerm?: string | undefined;
  billingMonth?: string | undefined;
  // assetLocation?: string | undefined;
};

export type IMobileBillRequest = {
  billDate: Date;
  billingMonth: string;
  mobileNo: string;
  billAmount: number;
  billLimit: number;
  deduction: number;
  usage: number;
  userId: string;
};
