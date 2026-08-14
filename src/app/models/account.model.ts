import { ApiResponse } from "./api-response.model";

export interface AccountRequest {
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

export type AccountsApiResponse = ApiResponse<AccountResponse[]>;
export type AccountApiResponse = ApiResponse<AccountResponse>;
