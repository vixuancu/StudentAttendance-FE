import apiClient from "./client";
import type {
    Student,
    StudentCreateRequest,
    StudentUpdateRequest,
    DataResponse,
    ListResponse,
     } from "@/types";

const studentApi = {
    getAll: (params?: {page?: number; page_size?: number ; search?: string ; class_code?: string}) =>
        apiClient.get<ListResponse<Student>>("students", { params }),

    getById: (id: number) =>
        apiClient.get<DataResponse<Student>>(`students/${id}`),

    create: (data: StudentCreateRequest) => 
        apiClient.post<DataResponse<Student>>("students", data),

    update: (id: number, data: StudentUpdateRequest) => 
        apiClient.put<DataResponse<Student>>(`students/${id}`, data),

    delete: (id: number) => 
        apiClient.delete<DataResponse<null>>(`students/${id}`),
}
export default studentApi;