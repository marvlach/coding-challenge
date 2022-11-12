import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoute = () => {
    const location = useLocation();
    const isAuth = !!JSON.parse(localStorage.getItem('qr-code-generator-LiF-user-identifiers'))?.token;
    return isAuth ? <Outlet/> : <Navigate to='/login' replace state={{from: location}} />

}

export default ProtectedRoute
