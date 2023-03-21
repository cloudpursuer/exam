import { configureStore } from "@reduxjs/toolkit"
import { adminSlice } from "./adminSlice";
import adminApi from "./adminApi";
import studentApi from "./studentApi";
import { stuSlice } from "./stuSlice";
import examApi from "./examApi";
import { answerSlice } from "./answerSlice";
import { examSlice } from "./examSlice";
import answerApi from "./answerApi";

const store = configureStore({
    reducer: {
        auth: adminSlice.reducer,
        stu: stuSlice.reducer,
        answer:answerSlice.reducer,
        exam:examSlice.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [examApi.reducerPath]: examApi.reducer,
        [answerApi.reducerPath]:answerApi.reducer
    },
    //@ts-ignore
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(
            adminApi.middleware,
            studentApi.middleware,
            examApi.middleware,
            answerApi.middleware
        )
})

export default store;