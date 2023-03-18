import { createSlice } from "@reduxjs/toolkit";

export const stuSlice = createSlice({
    
    name: 'student',

    initialState: () => {
        
        return {
            name: "",
            id:"",
            class:"",
            grade:"",
            specialty:""
        }
    },

    reducers: {
        login(state, action) {
            state.name = action.payload.name
            state.id = action.payload.id
            state.class=action.payload.class
            state.grade=action.payload.grade
            state.specialty=action.payload.specialty

            localStorage.setItem("name",state.name)
            localStorage.setItem("id",state.id)
            localStorage.setItem("class",state.class)
            localStorage.setItem("grade",state.grade)
            localStorage.setItem("specialty",state.specialty)

        },
        logout(state) {
            state.name = ""
            state.id = ""
            state.class = ""
            state.grade = ""
            state.specialty = ""

            localStorage.removeItem("name")
            localStorage.removeItem("id")
            localStorage.removeItem("class")
            localStorage.removeItem("grade")
            localStorage.removeItem("specialty")
        }
    }
})

export const { login,logout } = stuSlice.actions