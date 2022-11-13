import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {}, // for user object
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, {payload}) {
            state.data = payload
        },
        clearUser(state) {
            state.data = {}
        },
    },
    
})

export const userActions = userSlice.actions;

export default userSlice.reducer




