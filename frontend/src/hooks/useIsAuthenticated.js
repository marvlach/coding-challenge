import { useEffect, useState } from "react";
import { getUser } from "../api/users/userApi";
import useHttpRequest from "./useHttpRequest";
import { useDispatch } from 'react-redux';
import { userActions } from "../store/userSlice";

const useIsAuthenticated = () => {
    const [loggedIn, setLoggedIn] = useState(undefined); // <-- undefined
    const [isLoading, error, sendRequest] = useHttpRequest();
    const dispatch = useDispatch();

    useEffect(() => {

        // on successfull response 200 OK
        const onResponse = (resBody) => {
            console.log('returned 200', resBody);
            dispatch(userActions.setUser(resBody));
            setLoggedIn(true);
        }

        const getUserFromToken = async () => {
            try {
                await sendRequest(getUser, [], onResponse)
            } catch (error) {
                console.log(error);
                setLoggedIn(false);
            }
        }
        
        getUserFromToken();

    }, [dispatch, sendRequest]);
    
    return [loggedIn, isLoading, error];
}


export default useIsAuthenticated;