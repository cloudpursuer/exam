import { createSlice } from "@reduxjs/toolkit";

export const examSlice = createSlice({
    
    name: 'exam',

    initialState: () => {
        
        return {
            id:"",
            name: "",
            startTime:"",
            duration:"",
            grade:"",
            specialty:"",
            class:"",
            content:[]
        }
    },

    reducers: {
        init(state, action) {
            state.id = action.payload.id
            state.name = action.payload.name
            state.startTime=action.payload.startTime
            state.duration=action.payload.duration
            state.grade=action.payload.grade
            state.specialty=action.payload.specialty
            state.class=action.payload.class
            state.content=action.payload.content
        },
        clear(state) {
            state.name = ""
            state.id = ""
            state.startTime=""
            state.duration=""
            state.grade=""
            state.specialty=""
            state.class = ""
            state.content=[]
        }
    }
})

export const { init,clear } = examSlice.actions