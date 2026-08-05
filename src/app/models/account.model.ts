export interface AccountRequest {
  userId: number;
  name: string;
  typeId: number;
  initialBalance: number;
}

export interface AccountResponse {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
  initialBalance: number;
  currentBalance: number;
}
