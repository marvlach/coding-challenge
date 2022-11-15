import { Spin, Card, Alert, Button, Collapse, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/users/userApi";
import UserForm from "../../components/UserForm/UserForm";
import useHttpRequest from "../../hooks/useHttpRequest";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { csvFileToArray } from "../../utils/manageCsvFile";
import styles from './AddUsers.module.css';
const { Panel } = Collapse;

const AddMany = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [success, setSuccess] = useState(null);
    const [file, setFile] = useState();
    const [usersFromFile, setUsersFromFile] = useState([]);
    const [showAddMultipleForm, setShowAddMultipleForm] = useState(false);
    const [importButtonDisabled, setImportButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const fileReader = new FileReader();


    // hook that scrolls to top when error, success
    useScrollToTopForAlert(error, success);

    // once users have been uploaded by file, hide csv form, show Collapse form
    useEffect( () => {
        if (usersFromFile.length) {
            setShowAddMultipleForm(true);
        } 
    }, [usersFromFile])

    useEffect(() => {
        if (file) {
            setImportButtonDisabled(false);
            return;
        } 
        setImportButtonDisabled(true);
    }, [file])

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


    // Cancel or choose another file
    const handleCancel = () => {
        setShowAddMultipleForm(false);
        setFile();
        setUsersFromFile([]);
        setImportButtonDisabled(true);
    }

    const handleFileChange = (e) => {
        console.log('handleFileChange', e.target.files[0])
        setFile(e.target.files[0]);
        /* if (e.target.files[0]) {
            setImportButtonDisabled(false);
        }
        setImportButtonDisabled(true); */
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
        setSuccess('The users have been created. You will be redirected to the users page.');
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

                        <Button disabled={importButtonDisabled} onClick={handleFileSubmit} > IMPORT CSV </Button>
                    </form>
                </>}

                {showAddMultipleForm && <>
                    <div className={styles['button-container']}>
                        <Button type="primary" onClick={handleCancel}> Cancel or choose another file</Button>
                    </div>
                    

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
                        <div className={styles['button-container']}>     
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div> 
                    </Form>
                </>}
            </Card>
        </Spin>
    )
}

export default AddMany