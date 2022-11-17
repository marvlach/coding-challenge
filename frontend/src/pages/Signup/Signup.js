import { Card, Form, Alert, Spin } from "antd"
import styles from './Signup.module.css';
import useHttpRequest from "../../hooks/useHttpRequest";
import { signup } from "../../api/users/userApi";
import { useEffect, useState } from "react";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { useNavigate } from "react-router-dom";
import useIsAuthForPublicRoutes from "../../hooks/useIsAuthForPublicRoutes";
import UserForm from "../../components/UserForm/UserForm";

const initialValues = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    city: "",
    code: "",
    country: "",
    role: "",
    password: "",
    passwordRe: "",
    remember: true,
}

const Signup = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [stay, setStay, authIsLoading, authError] = useIsAuthForPublicRoutes();
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // hook that scrolls to top when error, success
    useScrollToTopForAlert(error, success);

    // wait 1sec to see message and redirect to /login
    useEffect(() => {

        if (!success) {
            return
        }
        const timer = setTimeout(() => {
            navigate("/login");
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [navigate, success])

    // 200 ok response
    const onResponse = (values, resBody) => {
        setSuccess('Your account has been created. You will be redirected to the login page.');
    }

    // form fields are ok: send request
    const onFinish = async (values) => {
        const { username, email, role, password, passwordRe, firstName, lastName, ...address} = values;
        const args = {username, email, password, firstName, lastName, role, address}
        await sendRequest(signup, [args], onResponse.bind(null, args))
    }

    // form fields not ok
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
    <>{ (stay || authError)  && 
        <Spin tip="Loading..." spinning={isLoading || authIsLoading} >

            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon closable banner />}

            {success && <Alert style={{width: '90%', margin: '1rem auto'}} message={success} type="success" showIcon closable banner/>}

            <Card className={styles['form-container']} >
                <h1 className={styles['form-title']}> Signup </h1>
                
                <Form 
                    name="signup"
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <UserForm mode={'signup'} />
                </Form> 
            </Card>
        </Spin>}
    </>)
}

export default Signup