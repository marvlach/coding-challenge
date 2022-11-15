import { Spin, Card, Alert, Button, Collapse, Form } from "antd";
import { useState } from "react";
import UserForm from "../../components/UserForm/UserForm";
import useHttpRequest from "../../hooks/useHttpRequest";
import { csvFileToArray } from "../../utils/manageCsvFile";
import styles from './AddUsers.module.css';
const { Panel } = Collapse;

const AddMany = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [file, setFile] = useState();
    const [usersFromFile, setUsersFromFile] = useState([]);
    const fileReader = new FileReader();

    const onPanelChange = (key) => {
        console.log(key);
    };

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            return
        }
        
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
            console.log(csvOutput)
            setUsersFromFile(csvFileToArray(csvOutput));
        };

        fileReader.readAsText(file);
        
    }

    console.log(usersFromFile)
    const pannelList = usersFromFile?.map((user, index) => 
        <Panel header="This is panel header 1" key={index}>
            <p>{user.Nachname}</p>
        </Panel>
    )


    return (
        <>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <Button onClick={handleSubmit} > IMPORT CSV </Button>
            </form>

            <Collapse defaultActiveKey={['0']} onChange={onPanelChange}>
                {pannelList}
            </Collapse>
        </>
    )
}

export default AddMany