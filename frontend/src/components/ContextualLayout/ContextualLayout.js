import { Layout } from 'antd';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SideMenu from '../SideMenu/SideMenu';
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
            <Layout>
                <Header>
                    <HeaderMenu isLoggedIn={isLoggedIn}/> 
                </Header>
                {content}
                <Footer>
                    Footer
                </Footer>
            </Layout> 
        </>
    );
}

export default ContextualLayout