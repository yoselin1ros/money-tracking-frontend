export interface CategoryRequest {
  name: string;
  description?: string;
  typeId: number;
  userId: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  typeId: number;
  typeName: string;
}
