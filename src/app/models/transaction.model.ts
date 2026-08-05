export interface TransactionRequest {
  userId: number;
  accountId: number;
  categoryId: number;
  amount: number;
  note?: string;
}

export interface TransactionResponse {
  id: number;
  accountId: number;
  accountName: string;
  categoryId: number;
  categoryName: string;
  amount: number;
  typeId: number;
  typeName: string;
  note?: string;
  transactionDate: string;
}
