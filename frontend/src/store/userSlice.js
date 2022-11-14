import { createSlice } from '@reduxjs/toolkit';
import { clearTokenInLocalStorage } from '../utils/manageLocalStorage';

const initialState = {
    data: {}, // for user object
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.data = {};
            state.isAuth = false;
            clearTokenInLocalStorage();
        },
        setUser(state, { payload }){
            state.data = payload;
            state.isAuth = true;
        }
    },    
})

export const userActions = userSlice.actions;

export default userSlice.reducer




