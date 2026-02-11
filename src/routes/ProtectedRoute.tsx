import { Navigate,Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import type { UserRole } from "@/types";

interface Props {
    allowedRoles?: UserRole[];
}

/**
 * Bảo vệ Route:
 *  - Chưa đăng nhập → redirect /login
 *  - Không đủ role → redirect /403
 *  - OK → render children (Outlet)
 */
const ProtectedRoute = ({ allowedRoles }: Props) => {
    const {token,user} = useAuthStore();

    if(!token) {
        return <Navigate to="/login" replace />;    
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
    }
    return <Outlet />;
}
export default ProtectedRoute;