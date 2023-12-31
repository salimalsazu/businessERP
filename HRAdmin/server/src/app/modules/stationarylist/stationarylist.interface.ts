import { itemStatus } from '@prisma/client';

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
