export type IAssetAssignFilterRequest = {
  searchTerm?: string | undefined;
  // assetName?: string | undefined;
  // assetLocation?: string | undefined;
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
  kmLastMonth: number;
  kmThisMonth: number;
  usage: number;
};
