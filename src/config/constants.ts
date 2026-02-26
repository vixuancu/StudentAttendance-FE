/**
 * App-wide constants
 */

export const APP_NAME = "HOU Attendance";
export const APP_SHORT_NAME = "HOU";
export const APP_DESCRIPTION =
  "Hệ thống hỗ trợ điểm danh bằng nhận diện khuôn mặt";

// ── Role Labels ──
export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Quản trị viên",
  GIAO_VU: "Giáo vụ",
  GIANG_VIEN: "Giảng viên",
};

// ── Session Slot ──
export const SESSION_SLOT_LABELS: Record<string, string> = {
  SANG: "Buổi sáng",
  CHIEU: "Buổi chiều",
  TOI: "Buổi tối",
};

// ── Session Status ──
export const SESSION_STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ bắt đầu",
  ACTIVE: "Đang diễn ra",
  CLOSED: "Đã kết thúc",
};

// ── Attendance Status ──
export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  PRESENT: "Có mặt",
  ABSENT: "Vắng",
  LATE: "Muộn",
  UNCONFIRMED: "Chưa xác nhận",
};

// ── Student Status ──
export const STUDENT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Đang học",
  INACTIVE: "Nghỉ học",
  GRADUATED: "Đã tốt nghiệp",
};

// ── Pagination Defaults ──
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
