import apiClient from "./client";
import type {
  ClassSession,
  SessionCreateRequest,
  SessionUpdateRequest,
  DataResponse,
  ListResponse,
} from "@/types";

const sessionApi = {
  getAll: (params?: {
    page?: number;
    page_size?: number;
    course_id?: number;
    session_date?: string;
    status?: string;
  }) => apiClient.get<ListResponse<ClassSession>>("sessions", { params }),

  getById: (id: number) =>
    apiClient.get<DataResponse<ClassSession>>(`sessions/${id}`),

  create: (data: SessionCreateRequest) =>
    apiClient.post<DataResponse<ClassSession>>("sessions", data),

  update: (id: number, data: SessionUpdateRequest) =>
    apiClient.put<DataResponse<ClassSession>>(`sessions/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<DataResponse<null>>(`sessions/${id}`),

  // ── Workflow Actions ──
  activate: (id: number) =>
    apiClient.post<DataResponse<ClassSession>>(`sessions/${id}/activate`),

  close: (id: number) =>
    apiClient.post<DataResponse<ClassSession>>(`sessions/${id}/close`),
};

export default sessionApi;
