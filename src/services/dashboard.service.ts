import dashboardApi from "@/api/dashboard.api";
import type { DashboardStats } from "@/types";

const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await dashboardApi.getStats();
    return res.data.data;
  },
};

export default dashboardService;
