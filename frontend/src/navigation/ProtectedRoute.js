import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, } from 'react-router-dom';

// we came here from login. So far we know there is a token in local storage
// this token could be invalid or something. We need to get the user data to 
// proceed with the authentication
const ProtectedRoute = ({ children, }) => {
    const user = useSelector(store => store.user);
    const location = useLocation();

    if (!user.isAuth) {
        return <Navigate to='/login' replace={true} state={{from: location}}/>;
    }

    return children ? children : <Outlet />;
  };

export default ProtectedRoute
