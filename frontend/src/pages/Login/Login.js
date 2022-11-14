import { Card, Form, Input, Button, Alert, Spin } from "antd"
import styles from './Login.module.css';
import { InboxOutlined, LockOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import useHttpRequest from "../../hooks/useHttpRequest";
import { getUser, loginUser } from "../../api/users/userApi";
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from "../../utils/manageLocalStorage";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userActions } from "../../store/userSlice";

const Login = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const [showLoginForm, setShowLoginForm] = useState(undefined);
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    console.log('i came from ', location.state?.from?.pathname)

    // hook that scrolls to top when error
    useScrollToTopForAlert(error);

    useEffect(() => {
        // successfully used token to get userData
        const onGetUserResponse = (userData) => {
            console.log('successfully used token to get userData')
            dispatch(userActions.setUser(userData));
            // navigate(location.state?.from?.pathname ?? `/users`, { replace: true });
        }

        const figureOutAuthState = async () => {

            // if authenticated, go where i came from
            if (user.isAuth) {
                navigate(location.state?.from?.pathname ?? `/users`, { replace: true });
            
            // if not authenticated
            } else {

                // if there is a token try to login with it
                if (getTokenFromLocalStorage()) {
                    await sendRequest(getUser, [], onGetUserResponse) 
                    // after the request it rerenders

                // if no token
                } else {
                    console.log('no infinite loop: boolean is immutable')
                    setShowLoginForm(true);
                }
            }
        }

        figureOutAuthState().catch(error => console.log(error));
        
    }, [dispatch, showLoginForm, location.state?.from?.pathname, sendRequest, error, navigate, user.isAuth])
    

    // 200 response, assumes i got a token
    const onResponse = (values, resBody) => {
        console.log('logged in succesfully', values, resBody);

        // save token 
        saveTokenToLocalStorage(resBody.token);

        // hide form
        setShowLoginForm(false);

    }

    const onFinish = async (values) => {
        await sendRequest(loginUser, [values], onResponse.bind(null, values))
    }

    
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
    <>  { (showLoginForm || error)  && 
        <Spin tip="Loading..." spinning={isLoading} >
            {error && <Alert message={error} type="error" showIcon closable />}

            <Card className={styles['form-container']} >
                <h1 className={styles['form-title']}> Login </h1>
                <Form 
                    name="login"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                            },
                            {
                            required: true,
                            message: 'Please input your email!',
                            },
                        ]}
                    >
                    <Input 
                        placeholder="email"  
                        prefix={<Avatar icon={<InboxOutlined />} />} 
                    />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your password!'                                                           
                            },
                        ]}
                    >
                    <Input.Password 
                        placeholder="Password"  
                        prefix={<Avatar icon={<LockOutlined />} />} 
                    />
                    </Form.Item>
                    
                    <div className={styles['button-container']}>
                        <Form.Item > 
                            <Button type="primary" htmlType="submit" >
                                Login
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </Spin>}
    </>)
}

export default Login