import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { message } from "antd";

const apiClient = axios.create({
    baseURL: 'api/v1',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Request interceptor: tự động gắn JWT ──
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response interceptor: xử lý lỗi chung ──
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
          case 401:
            // token hết hạn or không hợp lệ -> logout
            useAuthStore.getState().logout();
            message.error(data?.message || "phiên đăng nhập hết hạn");
            break;
          case 403:
            message.error(data?.message || "không có quyền truy cập");
            break;
          case 404:
            message.error(data?.message || "Không tìm thấy");
            break;
          case 422:
            message.error(data?.message || "Dữ liệu không hợp lệ");
            break;
          default:
            message.error(data?.message || "Lỗi hệ thống");
        }
        return Promise.reject(error);
    }
)
export default apiClient;