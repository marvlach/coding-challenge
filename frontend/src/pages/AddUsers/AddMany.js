import { Spin, Card, Alert, Button, Collapse, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { createUser } from "../../api/users/userApi";
import UserForm from "../../components/UserForm/UserForm";
import useHttpRequest from "../../hooks/useHttpRequest";
import { csvFileToArray } from "../../utils/manageCsvFile";
import styles from './AddUsers.module.css';
const { Panel } = Collapse;

const AddMany = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [success, setSuccess] = useState(null);
    const [file, setFile] = useState();
    const [usersFromFile, setUsersFromFile] = useState([]);
    const [showAddMultipleForm, setShowAddMultipleForm] = useState(false);
    const fileReader = new FileReader();

    // once users have been uploaded by file, hide csv form, show Collapse form
    useEffect( () => {
        if (usersFromFile.length) {
            setShowAddMultipleForm(true);
        } 
    }, [usersFromFile])

    // Cancel or choose another file
    const handleCancel = () => {
        setShowAddMultipleForm(false);
        setFile();
        setUsersFromFile([])
    }

    

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            return
        }
        
        fileReader.onload = event => {
            const csvOutput = event.target.result;
            console.log(csvOutput)
            const array =  csvFileToArray(csvOutput);
            console.log(array)
            const arrayWithDefaultEmailUsername = array.map(user => {
                return {
                    ...user, 
                    username:`${user.firstName}${user.lastName}`, 
                    email: `${user.firstName}${user.lastName}@fakemail.com`,
                    password: '12345!!asdF'
                }
            })
            setUsersFromFile(arrayWithDefaultEmailUsername);
        };
        fileReader.readAsText(file);
    }

    const onPanelChange = (key) => {
        console.log(key);
    };

    // 200 ok response
    const onResponse = (values, resBody) => {
        setSuccess('The user has been created. You will be redirected to the users page.');
    }

    // form fields are ok: send request
    const onFinish = async (values) => {
        console.log(values.users)

        const args = values.users.map(user => {
            const { username, email, role, password, passwordRe, firstName, lastName, ...address} = user;
            return {username, email, password, firstName, lastName, role, address}
        })
                
        console.log(args);
        await sendRequest(createUser, [args], onResponse.bind(null, args));
    }

    // form fields not ok
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    console.log(usersFromFile)
    const pannelList = usersFromFile?.map((user, index) => <>
            <Panel header="This is panel header 1" key={index}>
                <p>{user.Nachname}</p>
                <UserForm mode={'addMany'}/>
            </Panel>
        </>
    )

    return (
        <Spin tip="Loading..." spinning={isLoading} >

            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon closable banner />}

            {success && <Alert style={{width: '90%', margin: '1rem auto'}} message={success} type="success" showIcon closable banner/>}

            <Card className={styles['form-container']} >

                {!showAddMultipleForm && <>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleFileChange}
                        />

                        <Button onClick={handleFileSubmit} > IMPORT CSV </Button>
                    </form>
                </>}

                {showAddMultipleForm && <>
                    <Button type="primary" onClick={handleCancel}> Cancel or choose another file</Button>

                    <Form
                        name="addOne"
                        layout="vertical"
                        initialValues={{
                            users: usersFromFile,
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        scrollToFirstError
                    >             
                    
                              
                            <Form.List name="users">
                                {(fields, actions) => (
                                    <>
                                    
                                    {fields.map(field => (
                                        <Collapse key={field.key} defaultActiveKey={['0']} onChange={onPanelChange}>
                                            <Panel header={`User ${field.key + 1}`} key={field.key}>
                                                <UserForm mode={'addMany'} key={field.key} field={field}/>
                                            </Panel>
                                        </Collapse>
                                    ))}                                
                                </>
                                )}
                            </Form.List>
                              
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        {/* <Collapse defaultActiveKey={['0']} onChange={onPanelChange}>
                            {pannelList}
                        </Collapse> */}
                    </Form>
                </>}
            </Card>
        </Spin>
    )
}

export default AddMany