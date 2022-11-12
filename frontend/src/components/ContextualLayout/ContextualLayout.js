import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SideMenu from '../SideMenu/SideMenu';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const isLoggedIn = false;

const ContextualLayout = (props) => {

    const content = !isLoggedIn ?  
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
                    <HeaderMenu isLoggedIn={isLoggedIn}/> 
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