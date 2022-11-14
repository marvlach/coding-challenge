import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import styles from './HeaderMenu.module.css';
import { Link, useLocation } from 'react-router-dom';
import store from '../../store/store';
import { userActions } from '../../store/userSlice';

const HeaderMenu = ({ user }) => {
    const location = useLocation();
    const { pathname } = location;

    const handleLogout = ({ key }) => {
        if (key === '/logout') {
            store.dispatch(userActions.logout())
        }
    }

    const notLoggedInMenuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to='/'> Home </Link>,
        },
        {
            key: '/signup',
            icon: <UserAddOutlined />,
            label: <Link to='/signup'> Sign Up </Link>,
        },
        {
            key: '/login',
            icon: <LoginOutlined />,
            label: <Link to='/login'> Login </Link>,
        },
    ]; 



    const loggedInMenuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to='/'> Home </Link>,
        },
        {
            key: '/user',
            icon: <UserAddOutlined />,
            label: user.data.username,
            children: [
                {
                    key: '/profile',
                    icon: <UserOutlined />,
                    label: <Link to={`/users/${user.data['_id']}`}> My Profile </Link>,
                },
                {
                    key: '/users',
                    icon: <UserOutlined />,
                    label: <Link to='/users'> Users List </Link>,
                },
                {
                    key: '/logout',
                    icon: <UserOutlined />,
                    label: 'Logout',
                },
            ]
        },
    ]; 



    return (
        <Menu 
            className={styles['menu']} 
            selectedKeys={[pathname]} 
            theme="dark" 
            mode="horizontal" 
            items={!user.isAuth ? notLoggedInMenuItems : loggedInMenuItems}
            onClick={handleLogout}
        />
    )
}

export default HeaderMenu;