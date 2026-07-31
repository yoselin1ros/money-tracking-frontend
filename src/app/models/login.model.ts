export interface User {
  id: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
  preferredCurrency: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  user: User;
}

export interface ApiResponse {
  message: string;
  status: number;
  data?: LoginResponse;
}