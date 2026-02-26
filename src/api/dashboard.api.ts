import apiClient from "./client";
import type { DashboardStats, DataResponse } from "@/types";

const dashboardApi = {
  getStats: () =>
    apiClient.get<DataResponse<DashboardStats>>("dashboard/stats"),
};

export default dashboardApi;
