import { Routes, Route, } from 'react-router-dom'
import Homepage from '../pages/Homepage/Homepage';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from '../pages/UserProfile/UserProfile';
import Users from '../pages/Users/Users';

const Routing = () => {
    return (  
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
            
    )
}

export default Routing