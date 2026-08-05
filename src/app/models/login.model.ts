import { ApiResponse } from "./api-response.model";
import { UserResponse } from "./user.model";

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  user: UserResponse;
}

export type LoginApiResponse = ApiResponse<LoginResponse>;
