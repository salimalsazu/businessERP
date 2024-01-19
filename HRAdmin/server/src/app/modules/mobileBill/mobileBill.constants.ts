export const MobileBillFilterableFields: string[] = ['searchTerm', 'billingMonth'];
export const MobileBillSearchableFields: string[] = ['mobileNo', 'firstName', 'lastName'];

export const MobileBillRelationalFields: string[] = ['assetName'];

export const MobileBillRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'assetName',
};
