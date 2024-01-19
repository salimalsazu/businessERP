export const MobileBillFilterableFields: string[] = ['searchTerm', 'assetName', 'assetCategory', 'assetLocation'];
export const MobileBillSearchableFields: string[] = ['assetName', 'assetId', 'firstName', 'lastName'];

export const MobileBillRelationalFields: string[] = ['assetName'];

export const MobileBillRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
