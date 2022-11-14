import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../api/users/userApi";
import { userActions } from "../store/userSlice";
import { getTokenFromLocalStorage } from "../utils/manageLocalStorage";
import useHttpRequest from "./useHttpRequest";


// it checks if is auth by using local storage token
const useIsAuthForPublicRoutes = () => {

    const [isLoading, error, sendRequest] = useHttpRequest();
    const [stay, setStay] = useState(undefined);
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    console.log('i came from ', location.state?.from?.pathname);

    useEffect(() => {
        // successfully used token to get userData
        const onGetUserResponse = (userData) => {
            console.log('successfully used token to get userData')
            dispatch(userActions.setUser(userData));
            // navigate(location.state?.from?.pathname ?? `/users`, { replace: true });
        }

        const figureOutAuthState = async () => {

            // if authenticated, go where i came from
            if (user.isAuth) {
                navigate(location.state?.from?.pathname ?? `/users`, { replace: true });
            
            // if not authenticated
            } else {

                // if there is a token try to login with it
                if (getTokenFromLocalStorage()) {
                    await sendRequest(getUser, [], onGetUserResponse) 
                    // after the request it rerenders

                // if no token
                } else {
                    console.log('no infinite loop: boolean is immutable')
                    setStay(true);
                }
            }
        }

        figureOutAuthState().catch(error => console.log(error));

    }, [dispatch, stay, location.state?.from?.pathname, sendRequest, error, navigate, user.isAuth])
    
    console.log('useIsAuthForPublicRoutes', error);
    return [stay, setStay, isLoading, error]
}

export default useIsAuthForPublicRoutes