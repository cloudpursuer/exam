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
            content:[{}]
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
        },
        save(state,action){
            //@ts-ignore
            state.content = state.content.filter(item=>item.num!==action.payload.num)
            //@ts-ignore
            state.content = state.content.filter(item=>item.num!==undefined)
            state.content.push(action.payload)
        },
        clear(state) {
            state.identifier=""
            state.name = ""
            state.id = ""
            state.class = ""
            state.grade = ""
            state.specialty = ""
            state.organizer=""
            state.content=[{}]
        }
    }
})

export const { init,clear,save } = answerSlice.actions