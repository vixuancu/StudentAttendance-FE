// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  role: UserRole;
}

export type UserRole = "ADMIN" | "GIAO_VU" | "GIANG_VIEN";
// ── API Response (match backend DataResponse / ListResponse) ──
export interface DataResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error_code?: string;
  details?: Record<string, unknown>[];
}

// ── Student ──
export interface Student {
  id: number;
  student_code: string;
  full_name: string;
  class_code?: string;
  email?: string;
  phone?: string;
  enrollment_year?: number;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface StudentCreateRequest {
  student_code: string;
  full_name: string;
  class_code?: string;
  email?: string;
  phone?: string;
  enrollment_year?: number;
}

export interface StudentUpdateRequest {
  full_name?: string;
  class_code?: string;
  email?: string;
  phone?: string;
  enrollment_year?: number;
  status?: string;
}

// ── Pagination ──
export interface PaginationParams {
  page: number;
  page_size: number;
  search?: string;
}
