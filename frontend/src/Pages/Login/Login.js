import { Card, Form, Input, Button } from "antd"
import styles from './Login.module.css';
import { InboxOutlined, LockOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import useHttpRequest from "../../hooks/useHttpRequest";
import { loginUser } from "../../api/users/userApi";

const Login = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();

    const onResponse = (values, resBody) => {
        console.log('logged in succesfully', values, resBody);
    }

    const onFinish = async (values) => {
        await sendRequest(loginUser, [values], onResponse.bind(null, values))
    }

    
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };
   

    return (
    <>
        {isLoading}
        {error}
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
                    prefix={<Avatar size="large" icon={<InboxOutlined />} />} 
                    data-cy={'email-input'}
                />
                </Form.Item>
                 
                <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!'                                                           
                        },
                    ]}
                >
                <Input.Password 
                    placeholder="Password"  
                    prefix={<Avatar size="large" icon={<LockOutlined />} />} 
                    data-cy={'password-input'}
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
    </>)
}

export default Login