import {configureStore} from "@reduxjs/toolkit"
import { adminSlice } from "./adminSlice";
import adminApi from "./adminApi";

const store = configureStore({
    reducer:{
        auth:adminSlice.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
    },
})

export default store;