import attendanceApi from "@/api/attendance.api";
import type {
  AttendanceRecord,
  AttendanceUpdateRequest,
  AttendanceEvent,
  SessionAttendanceSummary,
} from "@/types";

const attendanceService = {
  /** Lấy danh sách điểm danh của buổi học */
  getSessionAttendance: async (
    sessionId: number,
  ): Promise<AttendanceRecord[]> => {
    const res = await attendanceApi.getBySession(sessionId);
    return res.data.data;
  },

  /** Cập nhật trạng thái điểm danh (nghiệp vụ 7) */
  updateStatus: async (
    recordId: number,
    data: AttendanceUpdateRequest,
  ): Promise<AttendanceRecord> => {
    const res = await attendanceApi.updateStatus(recordId, data);
    return res.data.data;
  },

  /** Điểm danh thủ công */
  manualMark: async (
    sessionId: number,
    studentId: number,
    data: AttendanceUpdateRequest,
  ): Promise<AttendanceRecord> => {
    const res = await attendanceApi.manualMark(sessionId, studentId, data);
    return res.data.data;
  },

  /** Lấy event log AI detect */
  getEvents: async (sessionId: number): Promise<AttendanceEvent[]> => {
    const res = await attendanceApi.getEvents(sessionId);
    return res.data.data;
  },

  /** Thống kê nhanh */
  getSummary: async (sessionId: number): Promise<SessionAttendanceSummary> => {
    const res = await attendanceApi.getSummary(sessionId);
    return res.data.data;
  },

  /** Xuất Excel */
  exportExcel: async (sessionId: number): Promise<void> => {
    const res = await attendanceApi.exportExcel(sessionId);
    const blob = new Blob([res.data as BlobPart], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_session_${sessionId}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  },
};

export default attendanceService;
