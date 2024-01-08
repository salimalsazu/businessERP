export const AssetListFilterableFields: string[] = ['searchTerm', 'assetName', 'assetCategory', 'assetLocation'];
export const AssetItemListSearchableFields: string[] = ['assetName', 'assetId'];

export const AssetItemListRelationalFields: string[] = ['assetName'];

export const AssetItemListRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
