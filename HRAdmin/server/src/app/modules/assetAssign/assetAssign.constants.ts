export const AssetAssignFilterableFields: string[] = ['searchTerm', 'assetName', 'assetCategory', 'assetLocation'];
export const AssetAssignSearchableFields: string[] = ['assetName', 'assetId', 'firstName', 'lastName'];

export const AssetAssignRelationalFields: string[] = ['assetName'];

export const AssetAssignRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
