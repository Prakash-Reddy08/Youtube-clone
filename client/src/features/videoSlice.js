import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: {},
    loading: false,
    error: false,
}

const videoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload
        },
        fetchFailure: (state) => {
            state.currentVideo = null;
            state.loading = false
            state.error = true
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.disLikes.splice(
                    state.currentVideo.disLikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.currentVideo.disLikes.includes(action.payload)) {
                state.currentVideo.disLikes.push(action.payload);
                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
    }
})

export const { fetchFailure, fetchSuccess, fetchStart, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;