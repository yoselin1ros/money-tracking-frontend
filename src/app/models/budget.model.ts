export interface BudgetRequest {
  userId: number;
  categoryId: number;
  spendingLimit: number;
  periodTypeId: number;
  periodStart?: string;
  periodEnd?: string;
}

export interface BudgetResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  spendingLimit: number;
  periodTypeId: number;
  periodTypeName: string;
  periodStart?: string;
  periodEnd?: string;
}
