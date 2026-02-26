import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import StudentsPage from "@/pages/Students";
import CoursesPage from "@/pages/Courses";
import SessionsPage from "@/pages/Sessions";
import AttendancePage from "@/pages/Attendance";
import UsersPage from "@/pages/Users";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    // Tất cả route cần đăng nhập
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/students", element: <StudentsPage /> },
          { path: "/courses", element: <CoursesPage /> },
          { path: "/sessions", element: <SessionsPage /> },
          { path: "/attendance", element: <AttendancePage /> },
          // Chỉ ADMIN
          { path: "/users", element: <UsersPage /> },
        ],
      },
    ],
  },
  {
    path: "/403",
    element: (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>403 – Không có quyền truy cập</h2>
      </div>
    ),
  },
]);

export default router;
