export interface FrequentExpenseRequest {
  userId: number;
  categoryId: number;
  name: string;
  amount: number;
}

export interface FrequentExpenseResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  amount: number;
}
