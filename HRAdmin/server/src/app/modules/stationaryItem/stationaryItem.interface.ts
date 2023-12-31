export type IStationaryItemFilterRequest = {
  searchTerm?: string | undefined;
  itemName?: string | undefined;
};
export type IStationaryItemCreateRequest = {
  itemName: string;
  stockQuantity: number;
};



export type IStyleWiseCourier = {
  styleNo: string;
  _count: {
    couriers: number;
  };
};
