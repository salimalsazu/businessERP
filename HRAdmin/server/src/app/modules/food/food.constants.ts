export const FoodExpFilterableFields: string[] = ['searchTerm', 'firstName', 'lastName', 'month'];
export const FoodExpSearchableFields: string[] = ['firstName', 'lastName'];

export const StyleWiseCourierFilterableFields: string[] = ['searchTerm', 'styleNo'];

export const StyleWiseCourierSearchableFields: string[] = ['styleNo'];

export const FoodExpRelationalFields: string[] = ['styleNo'];
export const FoodExpRelationalFieldsMapper: { [key: string]: string } = {
  foodExpDate: 'foodExpDate',
};
