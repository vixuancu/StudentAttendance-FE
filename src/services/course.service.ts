import courseApi from "@/api/course.api";
import type {
  Course,
  CourseCreateRequest,
  CourseUpdateRequest,
  CourseStudent,
} from "@/types";

const courseService = {
  getCourses: async (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    semester?: string;
    lecturer_id?: number;
  }) => {
    const res = await courseApi.getAll(params);
    return res.data;
  },

  getCourse: async (id: number): Promise<Course> => {
    const res = await courseApi.getById(id);
    return res.data.data;
  },

  createCourse: async (data: CourseCreateRequest): Promise<Course> => {
    const res = await courseApi.create(data);
    return res.data.data;
  },

  updateCourse: async (
    id: number,
    data: CourseUpdateRequest,
  ): Promise<Course> => {
    const res = await courseApi.update(id, data);
    return res.data.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    await courseApi.delete(id);
  },

  // ── Course Students ──
  getCourseStudents: async (courseId: number): Promise<CourseStudent[]> => {
    const res = await courseApi.getStudents(courseId);
    return res.data.data;
  },

  addCourseStudents: async (
    courseId: number,
    studentIds: number[],
  ): Promise<void> => {
    await courseApi.addStudents(courseId, studentIds);
  },

  removeCourseStudent: async (
    courseId: number,
    studentId: number,
  ): Promise<void> => {
    await courseApi.removeStudent(courseId, studentId);
  },
};

export default courseService;
