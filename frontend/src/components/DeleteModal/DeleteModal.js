import { Modal } from "antd";
import styles from './DeleteModal.module.css';
import useHttpRequest from '../../hooks/useHttpRequest'
import { useEffect, useReducer, useState } from "react";
import { deleteUser } from "../../api/users/userApi";
import { useDispatch, useSelector } from "react-redux";
import {userActions} from '../../store/userSlice';
import { useLocation, useNavigate } from "react-router-dom";
import {memo} from 'react';

const modalReducer = (state, action) => {
    if (action.type === 'INIT_OPEN') {
        return {
            text: `Are you sure you want to delete ${action.payload.username}?`,
            navigate: false,
            logout: false
        }
    }

    if (action.type === 'SUCCESS') {
        return {
            text: `Successfully delete user ${action.payload.username}`,
            navigate: action.payload.navigate,
            logout: action.payload.logout
        }
    }
    
    if (action.type === 'FAIL') {
        return {
            text: `Could not delete user ${action.payload.username}. ${action.payload.error}`,
            navigate: state.navigate,
            logout: state.logout
        }
    }

    return {
        text: "",
        navigate: false,
        logout: false   
    }
    

}


const DeleteModal = ({ handleCloseModal, userToDelete }) => {
    const [isLoading, error, sendRequest] = useHttpRequest();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const storeUser = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [modal, dispatchModal] = useReducer(modalReducer, {
        text: "",
        navigate: false,
        logout: false
    })


    
    // on init
    useEffect(() => {
        if (!userToDelete.username || !userToDelete.id) {
            return 
        }

        dispatchModal({
            type: 'INIT_OPEN',
            payload: {
                id: userToDelete.id,
                username: userToDelete.username
            }
        })
        
    }, [userToDelete.username, userToDelete.id])

    // decide what to do next, wait a bit and do it
    useEffect(() => {
        if (!modal.logout && !modal.navigate) {
            return 
        }

        const timer = setTimeout(() => {
            if (modal.logout) {
                dispatch(userActions.logout());
            } else { // if in /users: reload, else go to users
                navigate(pathname === '/users' ? 0 : '/users')
            }
        }, 100);
        
        return () => {
            clearTimeout(timer);
        }

    }, [modal.logout, modal.navigate])

    // on fail to delete
    useEffect(() => {
        if (!error) {
            return
        }
        dispatchModal({ type: 'FAIL', payload: {username: userToDelete.username, error:error}})
    }, [error])
    

    // 200 edit succefully
    const onResponse = (resBody) => {
        
        // if loggedin user is deleted successfully, 
        dispatchModal({ type: 'SUCCESS', payload: {
            navigate: true,
            logout: storeUser.data['_id'] === userToDelete.id
        }})
    }

    const handleOk = async () => {
        await sendRequest(deleteUser, ['userToDelete.id'], onResponse);
    };

    const handleCancel = () => {
        handleCloseModal();
    }

    return (
        <>
        <Modal
            title="Title"
            open={true}
            onOk={handleOk}
            confirmLoading={isLoading}
            onCancel={handleCancel}
        >
            <p>{modal.text}</p>
      </Modal>
        </>
    );
}

export default memo(DeleteModal)