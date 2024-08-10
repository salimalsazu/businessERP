export type ITransactionFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type ITransactionCreateRequest = {
  transactionDate: Date;
  transactionType: string;
  transactionAmount: number;
  transactionDescription: string;
  trId: string;
  accountId: string;
};

export type ITransactionUpdateRequest = {
  transactionDate?: Date;
  transactionType?: string;
  transactionAmount?: number;
  transactionDescription?: string;
  accountId?: string;
};
