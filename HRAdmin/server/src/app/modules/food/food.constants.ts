export const CourierFilterableFields: string[] = ['searchTerm', 'styleNo', 'createdAt', 'courierDate', 'startDate', 'endDate'];
export const CourierSearchableFields: string[] = ['styleNo', 'courierName', 'awbNo'];

export const StyleWiseCourierFilterableFields: string[] = ['searchTerm', 'styleNo'];

export const StyleWiseCourierSearchableFields: string[] = ['styleNo'];

export const FoodExpRelationalFields: string[] = ['styleNo'];
export const FoodExpRelationalFieldsMapper: { [key: string]: string } = {
  foodExpDate: 'foodExpDate',
};
