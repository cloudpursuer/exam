import { configureStore } from "@reduxjs/toolkit"
import { adminSlice } from "./adminSlice";
import adminApi from "./adminApi";
import studentApi from "./studentApi";
import { stuSlice } from "./stuSlice";
import examApi from "./examApi";

const store = configureStore({
    reducer: {
        auth: adminSlice.reducer,
        stu: stuSlice.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [examApi.reducerPath]: examApi.reducer
    },
    //@ts-ignore
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(
            adminApi.middleware,
            studentApi.middleware,
            examApi.middleware
        )
})

export default store;