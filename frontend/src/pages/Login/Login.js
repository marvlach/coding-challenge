import { Card, Form, Input, Button } from "antd"
import styles from './Login.module.css';
import { InboxOutlined, LockOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import useHttpRequest from "../../hooks/useHttpRequest";
import { loginUser } from "../../api/users/userApi";
import { saveTokenToLocalStorage } from "../../utils/manageLocalStorage";

const Login = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    
    // 200 response, assumes i got a token
    const onResponse = (values, resBody) => {
        console.log('logged in succesfully', values, resBody);

        // save token 
        saveTokenToLocalStorage(resBody.token);

        // dispatch action to get user data 
        
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
    </>)
}

export default Login