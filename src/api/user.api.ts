import apiClient from "./client";
import type {
  User,
  UserCreateRequest,
  UserUpdateRequest,
  Lecturer,
  DataResponse,
  ListResponse,
} from "@/types";

const userApi = {
  // ── Users ──
  getAll: (params?: { page?: number; page_size?: number; search?: string }) =>
    apiClient.get<ListResponse<User>>("users", { params }),

  getById: (id: number) => apiClient.get<DataResponse<User>>(`users/${id}`),

  create: (data: UserCreateRequest) =>
    apiClient.post<DataResponse<User>>("users", data),

  update: (id: number, data: UserUpdateRequest) =>
    apiClient.put<DataResponse<User>>(`users/${id}`, data),

  delete: (id: number) => apiClient.delete<DataResponse<null>>(`users/${id}`),

  // ── Lecturers (dropdown data) ──
  getLecturers: () => apiClient.get<DataResponse<Lecturer[]>>("lecturers"),
};

export default userApi;
