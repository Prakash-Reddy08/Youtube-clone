import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: JSON.parse(
        localStorage.getItem('user')
    ),
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.currentUser = null;
            state.loading = false
            state.error = true
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
            localStorage.setItem('user', JSON.stringify(state.currentUser))
        },
    }
})

export const { loginFailure, loginSuccess, logoutUser, loginStart, subscription } = userSlice.actions;

export default userSlice.reducer;