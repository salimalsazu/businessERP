export const FuelListFilterableFields: string[] = ['searchTerm', 'purchaseDate', 'vehicleName', 'startDate', 'endDate'];
export const FuelListSearchableFields: string[] = ['vehicleName'];

export const FuelListRelationalFields: string[] = ['assetName'];

export const FuelListRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
