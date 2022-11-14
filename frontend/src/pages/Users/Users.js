import { Spin, Card, Alert } from "antd"
import styles from './Users.module.css'
import useHttpRequest from '../../hooks/useHttpRequest'
import UserItem from "../../components/UserItem/UserItem";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/users/userApi";

const Users = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const [userList, setUserList] = useState([]);


    useEffect(() => {
        const onResponse = (data) => {
            setUserList(data);
        }

        const fetchUsers = async () => {
            await sendRequest(getUsers, [{all: true}], onResponse);
        }

        fetchUsers().catch(error => console.log(error));
    }, [sendRequest]);


    const userItemList = userList?.map(user => {
        return <UserItem key={user['_id']} user={user} />
    })

    return (
        <Spin tip="Loading..." spinning={isLoading} >
            {error && <Alert message={error} type="error" showIcon closable />}

            <Card className={styles['list-container']} >
                <h1 className={styles['list-title']}> Users List </h1>
                <Card className={styles['users']} >
                    <ul>
                        {userItemList}
                    </ul>
                </Card>
            </Card>
        </Spin>
    )
}

export default Users