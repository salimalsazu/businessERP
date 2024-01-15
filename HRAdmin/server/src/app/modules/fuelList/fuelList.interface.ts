export type IFuelListFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
  vehicleName?: string | undefined;
};

export type IFuelListRequest = {
  purchaseDate: Date;
  vehicleId: string;
  kmPrevious: number;
  kmCurrent: number;
  fuelQuantity: number;
  fuelCost: number;
  perLitreCost: number;
  kmConsumed: number;
  usage: number;
};
