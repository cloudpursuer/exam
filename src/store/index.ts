import { configureStore } from "@reduxjs/toolkit"
import { adminSlice } from "./slice/adminSlice";
import adminApi from "./api/adminApi";
import studentApi from "./api/studentApi";
import { stuSlice } from "./slice/stuSlice";
import examApi from "./api/examApi";
import { answerSlice } from "./slice/answerSlice";
import { examSlice } from "./slice/examSlice";
import answerApi from "./api/answerApi";

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