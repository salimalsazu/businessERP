export const TransactionFilterableFields: string[] = ['searchTerm', 'startDate', 'endDate'];
export const TransactionSearchableFields: string[] = ['title', 'chequeNo'];

export const TransactionRelationalFields: string[] = ['styleNo'];
export const TransactionRelationalFieldsMapper: { [key: string]: string } = {
  foodExpDate: 'foodExpDate',
};
