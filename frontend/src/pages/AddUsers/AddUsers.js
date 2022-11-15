import { Card, Radio } from "antd";
import { useState } from "react";
import AddMany from "./AddMany";
import AddOne from "./AddOne";
import styles from './AddUsers.module.css';

const AddUsers = () => {
    
    const [value, setValue] = useState(1);    
    
    const onChange = (e) => {
        setValue(e.target.value)
    };

    return (
        <>
            <Card className={styles['radio-container']} >
                <h1 className={styles['form-title']}> Add New Users </h1>
                <div style={{ textAlign: "center" }}>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Add One User</Radio>
                        <Radio value={2}>Add Multiple with .csv</Radio>
                    </Radio.Group>
                </div>
            </Card>

            {value === 1 && <AddOne />}
            {value === 2 && <AddMany />}    
        </>
    )
}

export default AddUsers