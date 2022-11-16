import { Spin, Card, Alert, Button } from "antd";
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest'
import { useEffect, useState } from "react";
import { getUserById } from "../../api/users/userApi";
import { useParams } from "react-router-dom";

const UserProfile = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const [user, setUser] = useState([]);
    const userId = useParams().userId;

    const {username, firstName, lastName, address, email, role} = user;
    const fullName = `${firstName} ${lastName}`;
    const fullAddress = ` ${address?.street} ${address?.number}, ${address?.city}, ${address?.code}, ${address?.country}`;

    useEffect(() => {
        const onResponse = (data) => {
            setUser(data);
        }

        const fetchUsers = async () => {
            await sendRequest(getUserById, [userId], onResponse);
        }

        fetchUsers().catch(error => console.log(error));
    }, [sendRequest, userId]);

    const handleDelete = () => {
        
    }

    return (
        <Spin tip="Loading..." spinning={isLoading} >
            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon banner closable />}

            <Card className={styles['profile-container']} >
                <h1 className={styles['profile-title']}> User Profile </h1>
                <div className={styles['button-container']}>
                    <Link to={`/users/${userId}/edit`}> 
                        <Button style={{margin: '0 1rem'}} type="primary" >
                            Edit user 
                        </Button>
                    </Link>
                    <Button style={{margin: '0 1rem'}} type="primary" danger onClick={handleDelete}>
                        Delete user
                    </Button>
                </div>
                <div className={styles['user-info']} >
                    <div>{username}</div> 
                    <div>{email}</div> 
                    <div>{fullName}</div> 
                    <div>{fullAddress}</div> 
                    <div>{role}</div> 
                </div>
            </Card>
        </Spin>
    )
}

export default UserProfile