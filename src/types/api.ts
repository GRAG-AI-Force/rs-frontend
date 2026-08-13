export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: Record<string, string[]>;
}
