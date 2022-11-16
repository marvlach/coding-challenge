import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SideMenu from '../SideMenu/SideMenu';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;

const ContextualLayout = (props) => {

    const user = useSelector(store => store.user);

    const location = useLocation();
    const content = !user.isAuth || location.pathname === '/'?  
        <Content> 
            {props.children} 
        </Content> 
        :
        <Layout>
            <Sider>
                <SideMenu />
            </Sider>
            <Content>
                {props.children}
            </Content>
        </Layout>

    return (
        <>
            <Layout style={{minHeight:"100vh"}} >
                <Header>
                    <HeaderMenu user={user}/> 
                </Header>
                {content}
                <Footer style={{ textAlign: 'center', }} >
                    <p> Coding Test for Autohaus-Royal</p>
                    <p> marios.vlachog@gmail.com </p>
                </Footer>
            </Layout> 
            
        </>
    );
}

export default ContextualLayout