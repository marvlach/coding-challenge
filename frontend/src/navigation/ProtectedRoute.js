import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import useIsAuthenticated from '../hooks/useIsAuthenticated';

// we came here from login. So far we know there is a token in local storage
// this token could be invalid or something. We need to get the user data to 
// proceed with the authentication
const ProtectedRoute = ({ children, }) => {
    const [loggedIn, isLoading, error] = useIsAuthenticated();
    const location = useLocation();

    if (loggedIn === undefined) {
        return <>LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</>
    }

    if (!loggedIn) {
        return <Navigate to='/login' replace={true} state={{from: location}}/>;
    }

    return children ? children : <Outlet />;
  };

export default ProtectedRoute
