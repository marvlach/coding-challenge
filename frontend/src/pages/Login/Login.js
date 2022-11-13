import { Card, Form, Input, Button, Alert, Spin } from "antd"
import styles from './Login.module.css';
import { InboxOutlined, LockOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import useHttpRequest from "../../hooks/useHttpRequest";
import { loginUser } from "../../api/users/userApi";
import { saveTokenToLocalStorage } from "../../utils/manageLocalStorage";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/userSlice";
import { useEffect } from "react";

const Login = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // hook that scrolls to top when error
    useScrollToTopForAlert(error);

    // if already logged in go to landing page
    useEffect(() => {
        console.log('this useEffect')
        if (user.isAuth) {
            navigate(`/users`, { replace: true });
        }
    }, [user.isAuth, navigate])

    // 200 response, assumes i got a token
    const onResponse = (values, resBody) => {
        console.log('logged in succesfully', values, resBody);

        // save token 
        saveTokenToLocalStorage(resBody.token);

        // dispatch get user info
        dispatch(getUserData());

        // redirect to wherever I came from, or to landing page /users
        if (location.state?.from) {
            navigate(location.state.from)
        } else {
            navigate(`/users`, { replace: true })
        }
    }

    const onFinish = async (values) => {
        await sendRequest(loginUser, [values], onResponse.bind(null, values))
    }

    
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
    <>
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
        </Spin>
    </>)
}

export default Login