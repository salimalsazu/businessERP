import { Factory, Orders } from '@prisma/client';

export type IOrderFilterRequest = {
  searchTerm?: string | undefined;
  factoryId?: string | undefined;
  portId?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
  friStartDate?: string | null; // Date range end
  friEndDate?: string | null; // Date range end
};

export type IOrderCreateRequest = {
  orderNo: string;
  styleNo: string;
  noOfPack: number;
  totalPack: number;
  portId: string;
  buyerEtd: Date;
};
export type IOrderUpdateRequest = {
  styleNo?: string;
  noOfPack?: number;
  totalPack?: number;
  portId?: string;
  buyerEtd?: Date;
  isActiveOrder?: boolean;
  oldFilePath?: string;
};

export type IStyleWiseOrders = {
  styleNo: string;
  factory: Factory | null;
  orders: Orders[];
};
export type ICreateOrderResponse = {
  createdAt: Date;
  orderNo: string;
  styleNo: string;
};
