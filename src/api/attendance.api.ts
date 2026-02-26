import apiClient from "./client";
import type {
  AttendanceRecord,
  AttendanceUpdateRequest,
  AttendanceEvent,
  SessionAttendanceSummary,
  DataResponse,
} from "@/types";

const attendanceApi = {
  // ── Records (kết quả cuối) ──
  getBySession: (sessionId: number) =>
    apiClient.get<DataResponse<AttendanceRecord[]>>(
      `sessions/${sessionId}/attendance`,
    ),

  updateStatus: (recordId: number, data: AttendanceUpdateRequest) =>
    apiClient.put<DataResponse<AttendanceRecord>>(
      `attendance/${recordId}`,
      data,
    ),

  // Điểm danh thủ công (nghiệp vụ 7)
  manualMark: (
    sessionId: number,
    studentId: number,
    data: AttendanceUpdateRequest,
  ) =>
    apiClient.post<DataResponse<AttendanceRecord>>(
      `sessions/${sessionId}/attendance/manual`,
      { student_id: studentId, ...data },
    ),

  // ── Events (log AI detect – nghiệp vụ 6) ──
  getEvents: (sessionId: number) =>
    apiClient.get<DataResponse<AttendanceEvent[]>>(
      `sessions/${sessionId}/events`,
    ),

  // ── Summary ──
  getSummary: (sessionId: number) =>
    apiClient.get<DataResponse<SessionAttendanceSummary>>(
      `sessions/${sessionId}/attendance/summary`,
    ),

  // ── Export ──
  exportExcel: (sessionId: number) =>
    apiClient.get(`sessions/${sessionId}/attendance/export`, {
      responseType: "blob",
    }),
};

export default attendanceApi;
