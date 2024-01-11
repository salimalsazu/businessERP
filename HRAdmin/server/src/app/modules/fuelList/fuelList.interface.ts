export type IFuelListFilterRequest = {
  searchTerm?: string | undefined;
  // assetName?: string | undefined;
  // assetLocation?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
  vehicleNo?: string | undefined;
};

export type IFuelListRequest = {
  purchaseDate: Date;
  vehicleNo: string;
  kmPrevious: number;
  kmCurrent: number;
  fuelQuantity: number;
  fuelCost: number;
  perLitreCost: number;
  kmConsumed: number;
  usage: number;
};
