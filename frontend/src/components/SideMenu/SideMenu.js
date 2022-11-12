import { Menu } from 'antd';
import { UserOutlined, } from '@ant-design/icons';


const menuItems = [
    {
        key: '/user',
        icon: <UserOutlined />,
        label: 'Users',
        children: [
            {
                key: '/userList',
                icon: <UserOutlined />,
                label: 'Users List',
            },
            {
                key: '/createUsers',
                icon: <UserOutlined />,
                label: 'Create Users',
            },
        ]
    },
]; 

const SideMenu = () => {
    return <Menu theme="dark" mode="vertical" items={menuItems}/>
}

export default SideMenu;