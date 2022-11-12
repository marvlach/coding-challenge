import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'auth',
    initialState: initialUserState,
    reducers: {
        login(state, action) {
            console.log(action.payload.email, action.payload.password)
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;