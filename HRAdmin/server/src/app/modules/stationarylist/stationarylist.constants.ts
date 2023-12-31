export const StationaryListFilterableFields: string[] = ['searchTerm', 'itemName', 'createdAt', 'stockItemStatus'];
export const StationaryItemListSearchableFields: string[] = ['itemName'];

export const StyleWiseCourierFilterableFields: string[] = ['searchTerm', 'styleNo'];

export const StyleWiseCourierSearchableFields: string[] = ['styleNo'];

export const stationaryItemListRelationalFields: string[] = ['itemName'];
export const stationaryItemListRelationalFieldsMapper: { [key: string]: string } = {
  itemName: 'itemName',
};
