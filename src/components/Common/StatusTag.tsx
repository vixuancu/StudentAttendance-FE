import { Tag } from "antd";
import {
  ATTENDANCE_STATUS_LABELS,
  SESSION_STATUS_LABELS,
  STUDENT_STATUS_LABELS,
} from "@/config/constants";

// ── Color maps ──
const attendanceColorMap: Record<string, string> = {
  PRESENT: "success",
  ABSENT: "error",
  LATE: "warning",
  UNCONFIRMED: "processing",
};

const sessionColorMap: Record<string, string> = {
  PENDING: "default",
  ACTIVE: "processing",
  CLOSED: "success",
};

const studentColorMap: Record<string, string> = {
  ACTIVE: "success",
  INACTIVE: "default",
  GRADUATED: "blue",
};

// ── Components ──

export const AttendanceStatusTag = ({ status }: { status: string }) => (
  <Tag color={attendanceColorMap[status] ?? "default"}>
    {ATTENDANCE_STATUS_LABELS[status] ?? status}
  </Tag>
);

export const SessionStatusTag = ({ status }: { status: string }) => (
  <Tag color={sessionColorMap[status] ?? "default"}>
    {SESSION_STATUS_LABELS[status] ?? status}
  </Tag>
);

export const StudentStatusTag = ({ status }: { status: string }) => (
  <Tag color={studentColorMap[status] ?? "default"}>
    {STUDENT_STATUS_LABELS[status] ?? status}
  </Tag>
);
