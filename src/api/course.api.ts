import apiClient from "./client";
import type {
  Course,
  CourseCreateRequest,
  CourseUpdateRequest,
  CourseStudent,
  DataResponse,
  ListResponse,
} from "@/types";

const courseApi = {
  // ── CRUD ──
  getAll: (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    semester?: string;
    lecturer_id?: number;
  }) => apiClient.get<ListResponse<Course>>("courses", { params }),

  getById: (id: number) => apiClient.get<DataResponse<Course>>(`courses/${id}`),

  create: (data: CourseCreateRequest) =>
    apiClient.post<DataResponse<Course>>("courses", data),

  update: (id: number, data: CourseUpdateRequest) =>
    apiClient.put<DataResponse<Course>>(`courses/${id}`, data),

  delete: (id: number) => apiClient.delete<DataResponse<null>>(`courses/${id}`),

  // ── Course – Student (N-N) ──
  getStudents: (courseId: number) =>
    apiClient.get<DataResponse<CourseStudent[]>>(
      `courses/${courseId}/students`,
    ),

  addStudents: (courseId: number, studentIds: number[]) =>
    apiClient.post<DataResponse<null>>(`courses/${courseId}/students`, {
      student_ids: studentIds,
    }),

  removeStudent: (courseId: number, studentId: number) =>
    apiClient.delete<DataResponse<null>>(
      `courses/${courseId}/students/${studentId}`,
    ),
};

export default courseApi;
