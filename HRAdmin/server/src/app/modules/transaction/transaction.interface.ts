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
  debitAccountId: string;
  creditAccountId: string;
};

export type ITransactionUpdateRequest = {
  transactionDate?: Date;
  transactionType?: string;
  transactionAmount?: number;
  transactionDescription?: string;
  accountId?: string;
  debitAccountId?: string;
  creditAccountId?: string
};
