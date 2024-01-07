

export type IAssetItemListFilterRequest = {
  searchTerm?: string | undefined;
  assetName?: string | undefined;
  assetLocation?: string | undefined;
};

export type IAssetCreateRequest = {
  purchaseDate: Date;
  assetName: string;
  assetModel: string;
  assetQuantity: number;
  assetLocation: string;
  assetCategory: string;
  assetId: string;
};
