export const StationaryItemFilterableFields: string[] = ['searchTerm', 'itemName', 'createdAt', 'startDate', 'endDate', 'stockItemStatus'];
export const StationaryItemSearchableFields: string[] = ['itemName'];

export const StyleWiseCourierFilterableFields: string[] = ['searchTerm', 'styleNo'];

// export const StyleWiseCourierSearchableFields: string[] = ['styleNo'];

export const stationaryItemRelationalFields: string[] = ['itemName'];
export const stationaryItemRelationalFieldsMapper: { [key: string]: string } = {
  itemName: 'itemName',
};
