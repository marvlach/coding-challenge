import {List, Comment, Avatar, Button, Form, Input, Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './CommentList.module.css';
import { getCommentsByRecipientId, postComment } from '../../api/comments/commentApi.js'
import useHttpRequest from '../../hooks/useHttpRequest';
import { getColorFromMongoId, mongoDateToString } from '../../utils/utils';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const CommentList = ({ recipientId }) => {
    const [comments, setComments] = useState([]);
	const [success, setSuccess] = useState(true);
	const [isLoading, error, sendRequest] = useHttpRequest();
	const [form] = Form.useForm();

	// load comments
	useEffect(() => {
        const onResponse = (data) => {
			console.log(data)
            setComments(data);
        }

        const fetchUserComments = async () => {
            await sendRequest(getCommentsByRecipientId, [recipientId], onResponse);
        }

		if (success) {
			fetchUserComments().catch(error => console.log(error));
			setSuccess(false);
		}
    
    }, [sendRequest, recipientId, success]);

	// 200 commented succefully
	const onResponse = (values, resBody) => {
		console.log(values, resBody);	
		// this will trigger useEffect and refetch all comments, 
		// to see other peoples' comments as well
		form.resetFields();
		setSuccess(true);
	}

	// form fields are ok: send request
	const onFinish = async (values) => {
		const args = {...values, recipientId:recipientId}
		console.log(args)
		await sendRequest(postComment, [args], onResponse.bind(null, args));
	}

	// form fields not ok
	const onFinishFailed = (error) => {
		console.log('Failed:', error); 
	};

   
    return (
		<Spin tip="Loading..." spinning={isLoading} >
        <div className={styles['comments-container']}>
            {comments.length > 0 && 
            <List
                className="comment-list"
                header={`${comments.length} comments`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                    <li>
                        <Comment
                            avatar={
                                <Avatar 
                                    style={{ 
										backgroundColor: `#${getColorFromMongoId(item.author?._id ?? 'ffffff')}`, 
										verticalAlign: 'middle', 
									}} 
                                    size="large" 
                                    gap={1}
                                >
									<Link to={`/users/${item.author?._id}`}>
                                    	{item.author?.username?.charAt(0) ?? 'D'} 
									</Link>
                                </Avatar>
                            }
                            author={
								<Link to={`/users/${item.author?._id}`}>
									<span>{item.author?.username ?? 'Deleted User'}</span>
								</Link>
							} 
                            content={item.comment}
                            datetime={mongoDateToString(item.updatedAt)}
                        />
                    </li>
                )}
            />}

            <Comment
                avatar={<Avatar size="medium" icon={<UserOutlined />} />}
                content={
					<Form
						form={form}
						name="comment"
						initialValues={{}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						scrollToFirstError
					>
                        <Form.Item
							name={'comment'}
							rules={[
								{
									required: true,
									message: 'Please write a comment',
								},
							]}
						>
                            <TextArea rows={3} />
                        </Form.Item>
                        <Form.Item>
							<Button htmlType="submit" loading={isLoading} type="primary">
								Add Comment
							</Button>
                        </Form.Item>
					</Form>					
                }
            />
        </div>   
		</Spin> 
    );
}

export default  CommentList