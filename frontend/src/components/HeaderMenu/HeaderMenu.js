import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import styles from './HeaderMenu.module.css';
import { Link, useLocation } from 'react-router-dom';


const HeaderMenu = ({isLoggedIn}) => {
    const location = useLocation();
    const { pathname } = location;


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
            label: 'Marios',
            children: [
                {
                    key: '/profile',
                    icon: <UserOutlined />,
                    label: 'Profile',
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
            items={!isLoggedIn ? notLoggedInMenuItems : loggedInMenuItems}
        />
    )
}

export default HeaderMenu;