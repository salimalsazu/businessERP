import { assignStatus, itemStatus } from '@prisma/client';

export type IStationaryItemListFilterRequest = {
  searchTerm?: string | undefined;
  itemName?: string | undefined;
  stockItemStatus?: itemStatus | undefined;
};

export type IAssetCreateRequest = {
  purchaseDate: Date;
  assetName: string;
  assetModel: string;
  assetQuantity: number;
  assetLocation: string;
  assetCategory: string;
  assetId: string;
};

export type IStationaryListAssignRequest = {
  lastAssignedDate: Date;
  assignItemStatus: assignStatus;
  assignQuantity: number;
  userId: string;
  stationaryItemId: string;
};
