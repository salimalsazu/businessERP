export const StationaryListFilterableFields: string[] = ['searchTerm', 'itemName', 'createdAt', 'stockItemStatus'];
export const StationaryItemListSearchableFields: string[] = ['itemName'];

export const stationaryItemListRelationalFields: string[] = ['itemName'];

export const stationaryItemListRelationalFieldsMapper: { [key: string]: string } = {
  itemName: 'itemName',
};

///Assign
export const StationaryAssignFilterableFields: string[] = [
  'searchTerm',
  'itemName',
  'firstName',
  'createdAt',
  'stockItemStatus',
  'assignItemStatus',
  'startDate',
  'endDate',
];

export const StationaryItemAssignSearchableFields: string[] = ['itemName', 'firstName'];
// export const StationaryItemAssignSearchableFields: string[] = ['itemName', 'stockItemStatus'];

export const stationaryItemAssignRelationalFields: string[] = ['stationaryItem', 'user', 'profile'];

export const stationaryItemAssignRelationalFieldsMapper: { [key: string]: string } = {
  stationaryItemId: 'itemName',
  profileId: 'firstName',
};
