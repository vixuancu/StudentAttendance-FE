import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrentUser,UserRole } from "@/types";

interface AuthState {
    token: string | null;
    user: CurrentUser | null;

    // Actions
    setAuth: (token: string, user: CurrentUser) => void;
    logout: () => void;

    // Getters
    isAuthenticated: () => boolean;
    hasRole: (...roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
      hasRole: (...roles) => {
        const user = get().user;
        return user ? roles.includes(user.role) : false;
      },
    }),
    {
      name: "auth-storage", // key trong localStorage
    },
  ),
);

