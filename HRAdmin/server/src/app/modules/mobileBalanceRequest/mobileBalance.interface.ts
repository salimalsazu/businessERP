import { assignStatus } from '@prisma/client';

export type IMobileBillFilterRequest = {
  searchTerm?: string | undefined;
  billingMonth?: string | undefined;
  // assetLocation?: string | undefined;
};

export type IMobileBalanceLimitRequest = {
  userId: string;
  billLimit: number;
  limitStatus: assignStatus;
};
