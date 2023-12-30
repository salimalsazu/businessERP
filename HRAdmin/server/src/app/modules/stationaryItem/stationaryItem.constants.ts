export const CourierFilterableFields: string[] = ['searchTerm', 'styleNo', 'createdAt', 'courierDate', 'startDate', 'endDate'];
export const StationaryItemSearchableFields: string[] = ['itemName'];

export const StyleWiseCourierFilterableFields: string[] = ['searchTerm', 'styleNo'];

export const StyleWiseCourierSearchableFields: string[] = ['styleNo'];

export const stationaryItemRelationalFields: string[] = ['itemName'];
export const stationaryItemRelationalFieldsMapper: { [key: string]: string } = {
  itemName: 'itemName',
};
