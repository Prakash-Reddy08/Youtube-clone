import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"


const Store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: true
})

export default Store