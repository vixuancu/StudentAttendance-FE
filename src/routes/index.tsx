import { createBrowserRouter } from "react-router-dom";
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';
import StudentsPage from '@/pages/Students';
// import thêm khi có 

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        // tất cả route cần đăng nhập
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {path: '/', element: <DashboardPage />},
                    {path: '/students', element: <StudentsPage />},
                    // { path: '/courses', element: <CoursesPage /> },
                    // { path: '/sessions', element: <SessionsPage /> },
                    // { path: '/attendance', element: <AttendancePage /> },
                ]
            }
        ],
    },
    {
    path: '/403',
    element: <div>Không có quyền truy cập</div>,
  },
])
export default router;
