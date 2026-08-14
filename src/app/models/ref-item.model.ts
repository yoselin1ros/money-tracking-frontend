import { ApiResponse } from "./api-response.model";

export interface RefItemResponse {
  id: number;
  name: string;
  description: string;
}

export type RefItemsApiResponse = ApiResponse<RefItemResponse[]>;
