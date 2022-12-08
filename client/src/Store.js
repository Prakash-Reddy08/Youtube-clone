import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"
import videoReducer from "./features/videoSlice"


const Store = configureStore({
    reducer: {
        user: userReducer,
        video: videoReducer
    },
    devTools: true
})

export default Store