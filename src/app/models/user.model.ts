export interface UserRequest {
  email: string;
  password: string;
  displayName: string;
  preferredCurrency: string;
}

export interface UserResponse {
  id: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
  preferredCurrency: string;
}