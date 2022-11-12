import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage/Homepage';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';

const Routing = () => {
    return (  
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            

            {/* <Route element={<ProtectedRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route path="*" element={<Page404 />} />
            </Route> */}
            
        </Routes>
            
    )
}

export default Routing