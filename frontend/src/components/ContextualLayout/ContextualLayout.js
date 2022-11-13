import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SideMenu from '../SideMenu/SideMenu';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;

const ContextualLayout = (props) => {

    const user = useSelector(store => store.user);

    const location = useLocation();
    console.log('location', location)
    const content = !user.isAuth ?  
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
                    <HeaderMenu isLoggedIn={user.isAuth}/> 
                </Header>
                {content}
                <Footer style={{ textAlign: 'center', }} >
                    Coding Test for Autohaus-Royal
                </Footer>
            </Layout> 
            
        </>
    );
}

export default ContextualLayout