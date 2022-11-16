import { Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal/DeleteModal';
import styles from './UserItem.module.css';

const UserItem = (props) => {
    const {username, firstName, lastName, address, email, role, _id: userId} = props.user;
    const fullName = `${firstName} ${lastName}`
    const fullAddress = ` ${address?.street} ${address?.number}, ${address?.city}, ${address?.code}, ${address?.country}`;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }



    return (<>
        <li>
            <div className={styles['user-card']}>
                <div className={styles['info-column']}>
                    <span className={styles['username']}>{username}</span>
                    <span className={styles['email']}>{email}</span>
                    <span className={styles['full-name']}>{fullName}</span>
                    <span className={styles['full-address']}>{fullAddress}</span>
                </div>
                <div className={styles['role-column']}>
                    <span className={styles['role']}>{role}</span>
                </div>
                <div className={styles['action-column']}>
                    <div className={styles['button-container']}>
                        <Link to={`/users/${userId}`}>                         
                            <Button style={{width: '8rem'}} type="primary" > 
                                View Profile                              
                            </Button>
                        </Link>
                    </div>
                    <div className={styles['button-container']}>
                        <Link to={`/users/${userId}/edit`}> 
                            <Button style={{width: '8rem'}} type="primary" >
                                Edit Profile 
                            </Button>
                        </Link>
                    </div>
                    <div className={styles['button-container']}>
                        <Button onClick={handleShowModal} style={{width: '8rem'}} type="primary" danger > 
                            Delete Profile 
                        </Button>
                    </div>
                </div>
                
            </div>
            
        </li>
        {showModal && <DeleteModal 
            handleCloseModal={handleCloseModal} 
            userToDelete={{id: userId, username: username} }
        />}
    </>
    )
}
export default UserItem