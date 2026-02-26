// ═══════════════════════════════════════════════════════════════
//  HOU Attendance System – Shared TypeScript Types
//  Match backend schemas 1:1
// ═══════════════════════════════════════════════════════════════

// ── Enums (string literal unions – TS erasable) ──────────────

export type UserRole = "ADMIN" | "GIAO_VU" | "GIANG_VIEN";

export type SessionSlot = "SANG" | "CHIEU" | "TOI";

export type SessionStatus = "PENDING" | "ACTIVE" | "CLOSED";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "UNCONFIRMED";

export type DetectedBy = "AI" | "MANUAL";

export type StudentStatus = "ACTIVE" | "INACTIVE" | "GRADUATED";

// ── Auth ─────────────────────────────────────────────────────

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: {
  access_token: string;
  token_type: string;
  }
}

export interface CurrentUser {
  id: number;
  username: string;
  role: UserRole;
}

// ── API Response (match backend DataResponse / ListResponse) ─

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

// ── User (admin manages) ────────────────────────────────────

export interface User {
  id: number;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface UserCreateRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface UserUpdateRequest {
  role?: UserRole;
  is_active?: boolean;
  password?: string;
}

// ── Lecturer ─────────────────────────────────────────────────

export interface Lecturer {
  id: number;
  user_id: number;
  lecturer_code: string;
  full_name: string;
  department?: string;
}

// ── Student ──────────────────────────────────────────────────

export interface Student {
  id: number;
  student_code: string;
  full_name: string;
  class_code?: string;
  email?: string;
  phone?: string;
  enrollment_year?: number;
  status: StudentStatus;
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
  status?: StudentStatus;
}

// ── Course (môn tín chỉ) ────────────────────────────────────

export interface Course {
  id: number;
  course_code: string;
  course_name: string;
  semester: string;
  lecturer_id: number;
  lecturer_name?: string; // join from BE
  student_count?: number; // aggregate from BE
  created_at: string;
  updated_at?: string;
}

export interface CourseCreateRequest {
  course_code: string;
  course_name: string;
  semester: string;
  lecturer_id: number;
}

export interface CourseUpdateRequest {
  course_name?: string;
  semester?: string;
  lecturer_id?: number;
}

// ── Course Student (N-N) ─────────────────────────────────────

export interface CourseStudent {
  course_id: number;
  student_id: number;
  student_code?: string;
  full_name?: string;
}

// ── Class Session (buổi học) ─────────────────────────────────

export interface ClassSession {
  id: number;
  course_id: number;
  course_name?: string; // join from BE
  session_date: string; // YYYY-MM-DD
  session_slot: SessionSlot;
  start_time?: string; // HH:mm
  end_time?: string;
  status: SessionStatus;
  created_at: string;
}

export interface SessionCreateRequest {
  course_id: number;
  session_date: string;
  session_slot: SessionSlot;
  start_time?: string;
  end_time?: string;
}

export interface SessionUpdateRequest {
  session_date?: string;
  session_slot?: SessionSlot;
  start_time?: string;
  end_time?: string;
  status?: SessionStatus;
}

// ── Attendance Record (kết quả cuối) ─────────────────────────

export interface AttendanceRecord {
  id: number;
  session_id: number;
  student_id: number;
  student_code?: string;
  full_name?: string;
  status: AttendanceStatus;
  detected_by: DetectedBy;
  detected_at?: string;
}

export interface AttendanceUpdateRequest {
  status: AttendanceStatus;
}

// ── Attendance Event (log AI detect) ─────────────────────────

export interface AttendanceEvent {
  id: number;
  session_id: number;
  student_id: number;
  confidence: number;
  image_path?: string;
  detected_at: string;
}

// ── Face Embedding ───────────────────────────────────────────

export interface FaceEmbedding {
  id: number;
  student_id: number;
  is_active: boolean;
  created_at: string;
}

// ── Dashboard Stats ──────────────────────────────────────────

export interface DashboardStats {
  total_students: number;
  total_courses: number;
  today_sessions: number;
  attendance_rate: number; // 0-100 percentage
}

export interface SessionAttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
  unconfirmed: number;
}

// ── Pagination ───────────────────────────────────────────────

export interface PaginationParams {
  page: number;
  page_size: number;
  search?: string;
}

// ── Select Option (for dropdowns) ────────────────────────────

export interface SelectOption {
  label: string;
  value: string | number;
}
