import { Spin, Card, Alert, Button, Collapse } from "antd";
import { useState } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import styles from './AddUsers.module.css';
const { Panel } = Collapse;

const AddUsers = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [file, setFile] = useState();
    const [usersFromFile, setUsersFromFile] = useState([]);

    const fileReader = new FileReader();

    const onPanelChange = (key) => {
        console.log(key);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        console.log('csvHeader', csvHeader)
        console.log('csvRows', csvRows)
        const array = csvRows.map(i => {
            const values = i.split(";");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setUsersFromFile(array);
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
            csvFileToArray(csvOutput);
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
            <Spin tip="Loading..." spinning={isLoading} >
            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon banner closable />}

            <Card className={styles['form-container']} >
                <h1 className={styles['form-title']}> Add New Users </h1>
                <div style={{ textAlign: "center" }}>
                    <h1>REACTJS CSV IMPORT EXAMPLE </h1>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />

                        <Button onClick={handleSubmit} > IMPORT CSV </Button>
                    </form>
                </div>
                
                <Collapse defaultActiveKey={['0']} onChange={onPanelChange}>
                    {pannelList}
                </Collapse>
  
            </Card>
        </Spin>
        </>
    )
}

export default AddUsers