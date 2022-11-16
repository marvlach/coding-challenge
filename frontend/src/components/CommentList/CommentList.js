import {Tooltip, List, Comment, Avatar, Button, Form, Input} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import styles from './CommentList.module.css';

const { TextArea } = Input;

const CommentList = ({ recipientId }) => {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const data = [
        {
          author: 'Han Solo',
          content: (
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully and
              efficiently.
            </p>
          ),
          datetime: (
            <Tooltip title="2016-11-22 11:22:33">
              <span>8 hours ago</span>
            </Tooltip>
          ),
        },
        {
          author: 'Han Solo',
          content: (
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully and
              efficiently.
            </p>
          ),
          datetime: (
            <Tooltip title="2016-11-22 10:22:33">
              <span>9 hours ago</span>
            </Tooltip>
          ),
        },
    ];

    const handleSubmit = () => {
        
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };


    return (
        <div className={styles['comments-container']}>
            {data.length > 0 && 
            <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <li>
                        <Comment
                            avatar={
                                <Avatar 
                                    style={{ backgroundColor: 'red', verticalAlign: 'middle', }} 
                                    size="large" 
                                    gap={1}
                                >
                                    {item.author.charAt(0)}
                                </Avatar>
                            }
                            author={item.author} // should have <Link>
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />}

            <Comment
                avatar={<Avatar size="medium" icon={<UserOutlined />} />}
                content={
                    <>
                        <Form.Item>
                            <TextArea rows={4} onChange={handleChange} value={value} />
                        </Form.Item>
                        <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                            Add Comment
                        </Button>
                        </Form.Item>
                    </>
                }
            />
        </div>    
    );
}

export default  CommentList