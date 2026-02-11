import studentApi from "@/api/student.api";
import type { Student, StudentCreateRequest, StudentUpdateRequest } from "@/types";

const studentService = {
  getStudents: async (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    class_code?: string;
  }) => {
    const res = await studentApi.getAll(params);
    return res.data; // { data: Student[], total, page, ... }
  },

  getStudent: async (id: number): Promise<Student> => {
    const res = await studentApi.getById(id);
    return res.data.data; // Student
  },

  createStudent: async (data: StudentCreateRequest): Promise<Student> => {
    const res = await studentApi.create(data);
    return res.data.data;
  },

  updateStudent: async (
    id: number,
    data: StudentUpdateRequest,
  ): Promise<Student> => {
    const res = await studentApi.update(id, data);
    return res.data.data;
  },

  deleteStudent: async (id: number): Promise<void> => {
    await studentApi.delete(id);
  },
};

export default studentService;
