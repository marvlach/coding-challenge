import { Spin, Card, Alert, Form, Button } from "antd";
import styles from './EditUser.module.css';
import { Link, useNavigate } from "react-router-dom";
import useHttpRequest from '../../hooks/useHttpRequest'
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/users/userApi";
import { useParams } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { useDispatch, useSelector } from "react-redux";
import {userActions} from '../../store/userSlice';

const EditUser = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [initialValues, setInitialValues] = useState({});
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();    
    const [showForm, setShowForm] = useState(false);
    const userId = useParams().userId;
    const dispatch = useDispatch();
    const storeUser = useSelector(store => store.user);

    // hook that scrolls to top when error, success
    useScrollToTopForAlert(error, success);

    // wait 1sec to see message and redirect to /login
    useEffect(() => {

        if (!success) {
            return
        }
        
        const timer = setTimeout(() => {
            navigate(`/users/${userId}`);
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [navigate, dispatch, success, userId])

    // show form when initial values are fetched
    useEffect(() => {
        if (initialValues.email) {
            setShowForm(true);
        }
    }, [initialValues])

    // fetch user info to init the form
    useEffect(() => {
        const onResponse = (data) => {
            // this should be me: data.requestedBy === reduxstore.userId
            // tranform res.body to form and init.
            const {address} = data;
            const {street, number, city, code, country} = address;
            const init = {...data, street, number, city, code, country};
            delete init.address
            setInitialValues(init);
        }

        const fetchUsers = async () => {
            await sendRequest(getUserById, [userId], onResponse);
        }

        fetchUsers().catch(error => console.log(error));
    }, [sendRequest, userId]);

    // 200 edit succefully
    const onResponse = (values, resBody) => {
        
        // if loggedin user is edited successfully, 
        if (storeUser.data['_id'] === userId) {
            dispatch(userActions.setUser(resBody.data));
        }
        setSuccess('The user has been edited. You will be redirected to the users page.');
    }
    // form fields are ok: send request
    const onFinish = async (values) => {
        const { username, email, role, password, passwordRe, firstName, lastName, ...address} = values;
        const args = {username, email, role, password, passwordRe, firstName, lastName, address};
        await sendRequest(updateUser, [userId, args], onResponse.bind(null, args));
    }

    // form fields not ok
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
        <Spin tip="Loading..." spinning={isLoading} >

            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon closable banner />}

            {success && <Alert style={{width: '90%', margin: '1rem auto'}} message={success} type="success" showIcon closable banner/>}

            {showForm && <Card className={styles['form-container']} >
                <h1 className={styles['form-title']}> Edit User </h1>
                <Link to={`/users/${userId}`}> 
                    <Button style={{margin: '0 1rem'}} type="primary" >
                        Back to User Profile 
                    </Button>
                </Link>
                <Form
                    name="edit"
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <UserForm mode={'edit'} />
                </Form> 
            </Card>}
        </Spin>
    )
}

export default EditUser