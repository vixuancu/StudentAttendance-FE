import authApi from "@/api/auth.api";
import { useAuthStore } from "@/stores/authStore";
import type { LoginRequest, CurrentUser } from "@/types";

/**
 * Service layer: xử lý logic nghiệp vụ FE.
 * API layer chỉ gọi HTTP. Service layer xử lý:
 *  - Parse response → cập nhật store
 *  - Transform data
 *  - Business logic phía client
 */
const authService = {
    login: async (data: LoginRequest): Promise<CurrentUser> => {
      const res = await authApi.login(data);
      const { access_token } = res.data.data;

      // Decode JWT payload để lấy user info (không cần gọi API /me)
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      const user: CurrentUser = {
        id: Number(payload.sub),
        username: payload.username,
        role: payload.role,
      };

      // Lưu vào store (persist -> localStorage)
      useAuthStore.getState().setAuth(access_token, user);
      return user;
    },
    logout: () => {
        useAuthStore.getState().logout();
    },
}
export default authService;