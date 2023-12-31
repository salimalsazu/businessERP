import { assignStatus, itemStatus } from '@prisma/client';

export type IStationaryItemListFilterRequest = {
  searchTerm?: string | undefined;
  itemName?: string | undefined;
  stockItemStatus?: itemStatus | undefined;
};

export type IStationaryListCreateRequest = {
  purchaseDate: Date;
  purchaseQuantity: number;
  stockQuantity: number;
  stockItemStatus: itemStatus;
  stationaryItemId: string;
};

export type IStationaryListAssignRequest = {
  lastAssignedDate: Date;
  assignItemStatus: assignStatus;
  assignQuantity: number;
  userId: string;
  stationaryItemId: string;
};



export type IStyleWiseCourier = {
  styleNo: string;
  _count: {
    couriers: number;
  };
};
