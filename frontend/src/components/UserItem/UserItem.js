import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './UserItem.module.css';
const UserItem = (props) => {
    const {username, firstName, lastName, address, email, role, _id: userId} = props.user;
    const fullName = `${firstName} ${lastName}`
    const fullAddress = ` ${address.street} ${address.number}, ${address.city}, ${address.code}, ${address.country}`;

    return (
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
                            <Button type="primary"> 
                                View Profile                              
                            </Button>
                        </Link>
                    </div>
                    {/* <div className={styles['button-container']}><Button type="primary"> Actions </Button></div>
                    <div className={styles['button-container']}><Button type="primary"> Actions </Button></div> */}
                </div>
                
            </div>
            
        </li>
    )
}
export default UserItem