import { Menu } from 'antd';
import { UserOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const menuItems = [
    {
        key: '/user',
        icon: <UserOutlined />,
        label: 'Users',
        children: [
            {
                key: '/userList',
                icon: <UserOutlined />,
                label: <Link to='/users'> Users List </Link>,
            },
            {
                key: '/createUsers',
                icon: <UserOutlined />,
                label: <Link to='/users/add'> Add Users </Link>,
            },
        ]
    },
]; 

const SideMenu = () => {
    return <Menu theme="dark" mode="vertical" items={menuItems}/>
}

export default SideMenu;