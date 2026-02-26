import sessionApi from "@/api/session.api";
import type {
  ClassSession,
  SessionCreateRequest,
  SessionUpdateRequest,
} from "@/types";

const sessionService = {
  getSessions: async (params?: {
    page?: number;
    page_size?: number;
    course_id?: number;
    session_date?: string;
    status?: string;
  }) => {
    const res = await sessionApi.getAll(params);
    return res.data;
  },

  getSession: async (id: number): Promise<ClassSession> => {
    const res = await sessionApi.getById(id);
    return res.data.data;
  },

  createSession: async (data: SessionCreateRequest): Promise<ClassSession> => {
    const res = await sessionApi.create(data);
    return res.data.data;
  },

  updateSession: async (
    id: number,
    data: SessionUpdateRequest,
  ): Promise<ClassSession> => {
    const res = await sessionApi.update(id, data);
    return res.data.data;
  },

  deleteSession: async (id: number): Promise<void> => {
    await sessionApi.delete(id);
  },

  // ── Workflow ──
  activateSession: async (id: number): Promise<ClassSession> => {
    const res = await sessionApi.activate(id);
    return res.data.data;
  },

  closeSession: async (id: number): Promise<ClassSession> => {
    const res = await sessionApi.close(id);
    return res.data.data;
  },
};

export default sessionService;
