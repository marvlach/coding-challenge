import { Spin, Card, Alert, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/users/userApi";
import UserForm from "../../components/UserForm/UserForm";
import useHttpRequest from "../../hooks/useHttpRequest";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import styles from './AddUsers.module.css';

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
    role:"",
    password: "12345!!asdF",
    remember: true,
}

const AddOne = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();    

    // hook that scrolls to top when error, success
    useScrollToTopForAlert(error, success);

    // wait 1.5sec to see message and redirect to /users
    useEffect(() => {

        if (!success) {
            return
        }
        const timer = setTimeout(() => {
            navigate("/users");
        }, 1500);

        return () => {
            clearTimeout(timer)
        }
    }, [navigate, success]);

    // 200 ok response
    const onResponse = (values, resBody) => {
        setSuccess('The user has been created. You will be redirected to the users page.');
    }
    // form fields are ok: send request
    const onFinish = async (values) => {
        const { username, email, role, password, passwordRe, firstName, lastName, ...address} = values;
        const args = [{username, email, password, firstName, lastName, role, address}] // endpoint expects multiple
        await sendRequest(createUser, [args], onResponse.bind(null, args));
    }

    // form fields not ok
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
        <Spin tip="Loading..." spinning={isLoading} >

            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon closable banner />}

            {success && <Alert style={{width: '90%', margin: '1rem auto'}} message={success} type="success" showIcon closable banner/>}

            <Card className={styles['form-container']} >

                <Form
                    name="addOne"
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <UserForm mode={'addOne'} />
                </Form> 
            </Card>
        </Spin>
    )
}

export default AddOne