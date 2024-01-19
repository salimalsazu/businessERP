import { assignStatus, requestFor } from '@prisma/client';

export type IAssetAssignFilterRequest = {
  searchTerm?: string | undefined;
  // assetName?: string | undefined;
  // assetLocation?: string | undefined;
};

export type IMobileBillRequest = {
  assignDate: Date;
  assetListId: string;
  userId: string;
  assignStatus: assignStatus;
  note: string;
  requestFor: requestFor;
};
