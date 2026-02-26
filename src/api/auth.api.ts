import apiClient from "./client";  
import type { LoginRequest,LoginResponse,DataResponse } from "@/types";

const authApi = {
  login: (data: LoginRequest) => apiClient.post<DataResponse<LoginResponse>>("/auth/login", data),
};

export default authApi;