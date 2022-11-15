import { Form, Input, Button } from 'antd';
import styles from './UserForm.module.css';
import { validateNoStartEndSpaces } from "../../utils/antdFormFieldValidators";


// mode can be 'signup', 'addOne', 'addMany'. 
const UserForm = ({ mode }) => { 
    
    return (
        <>    
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
        
            {mode !== 'signup' && <> 

                <Form.Item
                    name="password"
                    label="Password (This is default password. Please notify the user to change it)"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    },
                    ]}
                >
                    <Input.Password
                        disabled={true}
                        visibilityToggle={{ visible: true/* , onVisibleChange: () => {} */ }}
                    />

                </Form.Item>
            
            
            </>}

            {mode === 'signup' && <>
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
            </Form.Item> </>}
            
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


            {mode !== 'addMany' && 
            <div className={styles['button-container']}>
                <Form.Item > 
                    <Button type="primary" htmlType="submit" >
                        {mode === 'signup' ? 'Sign Up' : 'Create User'}
                    </Button>
                </Form.Item>
            </div>}
        </>
    )
}

export default UserForm