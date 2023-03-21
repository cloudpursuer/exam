import { createSlice } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
    
    name: 'answer',

    initialState: () => {
        
        return {
            identifier:"",
            id:"",
            name: "",
            grade:"",
            specialty:"",
            class:"",
            organizer:"",
            content:[]
        }
    },

    reducers: {
        init(state, action) {
            state.identifier=action.payload.identifier
            state.id = action.payload.id
            state.name = action.payload.name
            state.grade=action.payload.grade
            state.specialty=action.payload.specialty
            state.class=action.payload.class
            state.organizer=action.payload.organizer
            state.content=action.payload.content
        },
        clear(state) {
            state.identifier=""
            state.name = ""
            state.id = ""
            state.class = ""
            state.grade = ""
            state.specialty = ""
            state.organizer=""
            state.content=[]
        }
    }
})

export const { init,clear } = answerSlice.actions