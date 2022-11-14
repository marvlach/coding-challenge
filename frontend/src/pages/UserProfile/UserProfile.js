import { Spin, Card, Alert } from "antd"
import styles from './UserProfile.module.css'
import useHttpRequest from '../../hooks/useHttpRequest'
import { useEffect, useState } from "react";
import { getUserById } from "../../api/users/userApi";
import { useLocation, useParams } from "react-router-dom";

const UserProfile = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const [user, setUser] = useState([]);
    const userId = useParams().userId;

    useEffect(() => {
        const onResponse = (data) => {
            setUser(data);
        }

        const fetchUsers = async () => {
            await sendRequest(getUserById, [userId], onResponse);
        }

        fetchUsers().catch(error => console.log(error));
    }, [sendRequest]);

    return (
        <Spin tip="Loading..." spinning={isLoading} >
            {error && <Alert message={error} type="error" showIcon closable />}

            <Card className={styles['list-container']} >
                <h1 className={styles['list-title']}> User Profile </h1>
                <h2>{user.username}</h2>
            </Card>
        </Spin>
    )
}

export default UserProfile