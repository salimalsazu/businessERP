export const FuelListFilterableFields: string[] = ['searchTerm', 'purchaseDate', 'vehicleNo', 'startDate', 'endDate'];
export const FuelListSearchableFields: string[] = ['vehicleNo'];

export const FuelListRelationalFields: string[] = ['assetName'];

export const FuelListRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
