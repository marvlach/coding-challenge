import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../api/users/userApi';
import { clearTokenInLocalStorage } from '../utils/manageLocalStorage';

const initialState = {
    data: {}, // for user object
    isAuth: false
}
/* 
export const getUserData = createAsyncThunk('user/getUserData', async () => {
    const userResponse = await getUser();
    return userResponse.data;
}) */


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

    },/* 
    extraReducers: {
        [getUserData.pending]: (state) => {
            console.log('getUserData.pending')
            state.loading = true;
            state.isAuth = false;
            state.data = {}
        },
        [getUserData.fulfilled]: (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.data = action.payload;
        },
        [getUserData.rejected]: (state) => {
            state.loading = false;
            state.data = {};
            state.isAuth = false;
            clearTokenInLocalStorage();
        }
    }
 */
    
})

export const userActions = userSlice.actions;

export default userSlice.reducer




