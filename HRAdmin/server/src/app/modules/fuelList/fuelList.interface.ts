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

export type IFuelUpdateRequest = {
  purchaseDate?: Date;
  vehicleId?: string;
  kmPrevious?: number;
  kmCurrent?: number | undefined;
  fuelQuantity?: number | undefined;
  fuelCost?: number | undefined;
  perLitreCost?: number | undefined;
  kmConsumed?: number;
  usage?: number;
};
