import { Card, Form, Input, Button, Alert, Spin } from "antd"
import styles from './Signup.module.css';
import useHttpRequest from "../../hooks/useHttpRequest";
import { createUser } from "../../api/users/userApi";
import { validateNoStartEndSpaces } from "../../utils/antdFormFieldValidators";
import { useEffect, useState } from "react";
import useScrollToTopForAlert from "../../hooks/useScrollToTopForAlert";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // hook that scrolls to top when error, success
    useScrollToTopForAlert(error, success);

    // wait 1sec to see message and redirect to /login
    useEffect(() => {

        if (!success) {
            return
        }
        console.log('hereeeee')
        const timer = setTimeout(() => {
            navigate("/login");
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [navigate, success])

    // 200 ok response
    const onResponse = (values, resBody) => {
        setSuccess('Your account has been created. You will be redirected to the login page.');
    }

    // form fields are ok: send request
    const onFinish = async (values) => {
        const { username, email, role, password, passwordRe, firstName, lastName, ...address} = values;
        const args = {username, email, password, firstName, lastName, role, address}
        await sendRequest(createUser, [args], onResponse.bind(null, args))
    }

    // form fields not ok
    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };

    return (
    <>
        <Spin tip="Loading..." spinning={isLoading} >

            {error && <Alert style={{width: '90%', margin: '1rem auto'}} message={error} type="error" showIcon closable banner />}

            {success && <Alert style={{width: '90%', margin: '1rem auto'}} message={success} type="success" showIcon closable banner/>}

            <Card className={styles['form-container']} >
                <h1 className={styles['form-title']}> Signup </h1>
                <Form 
                    name="signup"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a username!',
                            },
                            {
                                validator: validateNoStartEndSpaces
                            }
                        ]}
                    >
                    <Input 
                        placeholder="Username"                      
                    />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                    <Input 
                        placeholder="Email"  
                    />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 4px 0 0'}}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please your first name!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="First Name"                          
                        />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 0 0 4px'}}
                            rules={[
                                {
                                required: true,
                                message: 'Please your last name!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="Last Name"                          
                        />
                        </Form.Item>
                    </Form.Item>
                    

                    
                    <Form.Item  >
                        <Form.Item
                            name="street"
                            label="Street"
                            style={{ display: 'inline-block', width: 'calc(70% - 4px)', margin: '0 4px 0 0'}}
                            rules={[
                                {
                                required: true,
                                message: 'Please provide your street!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="Street"                          
                        />
                        </Form.Item>

                        <Form.Item
                            label="Number"
                            name="number"
                            style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0  0 0 4px'}}
                            rules={[
                                {
                                required: true,
                                message: 'Please provide your street number!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="Number"                          
                        />
                        </Form.Item>
                    </Form.Item>
                    
                    <Form.Item >
                        <Form.Item
                            label="City"
                            name="city"
                            style={{ display: 'inline-block', width: 'calc(40% - 4px )', margin: '0 4px 0 0' }}
                            rules={[
                                {
                                required: true,
                                message: 'Please provide your city!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="City"                          
                        />
                        </Form.Item>

                        <Form.Item
                            label="Zip Code"
                            name="code"
                            style={{ display: 'inline-block', width: 'calc(20% - 4px )', margin: '0 2px 0 2px' }}
                            rules={[
                                {
                                required: true,
                                message: 'Please provide your zip code!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="Zip Code"                          
                        />
                        </Form.Item>

                        <Form.Item
                            label="Country"
                            name="country"
                            style={{ display: 'inline-block', width: 'calc(40% - 4px)', margin: '0 0 0 4px' }}
                            rules={[
                                {
                                required: true,
                                message: 'Please provide your country!',
                                },
                                {
                                    validator: validateNoStartEndSpaces
                                }
                            ]}
                        >
                        <Input 
                            placeholder="Country"                          
                        />
                        </Form.Item>
                    </Form.Item>
                
                    

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/.test(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Password must have at least 10 characters and contain at least one lowercase, one upercase, one number and one of the following characters !@#$%^&*'));
                            },
                        }),

                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Password"
                        />

                    </Form.Item>

                    <Form.Item
                        name="passwordRe"
                        label="Retype Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords you have provided do not match.'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Re-Enter Password"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a role!',
                            },
                            {
                                validator: validateNoStartEndSpaces
                            }
                        ]}
                    >
                    <Input 
                        placeholder="Role"                      
                    />
                    </Form.Item>


                    <div className={styles['button-container']}>
                        <Form.Item > 
                            <Button type="primary" htmlType="submit" >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </Spin>
    </>)
}

export default Signup