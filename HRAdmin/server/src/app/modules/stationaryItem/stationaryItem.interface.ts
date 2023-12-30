export type IStationaryItemFilterRequest = {
  searchTerm?: string | undefined;
  itemName?: string | undefined;
};
export type IStationaryItemCreateRequest = {
  itemName: string;
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
