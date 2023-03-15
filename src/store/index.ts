import {configureStore} from "@reduxjs/toolkit"
import { adminSlice } from "./adminSlice";
import adminApi from "./adminApi";
import studentApi from "./studentApi";

const store = configureStore({
    reducer:{
        auth:adminSlice.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [studentApi.reducerPath]:studentApi.reducer
    },
    //@ts-ignore
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(adminApi.middleware,studentApi.middleware)
})

export default store;