import { createSlice } from "@reduxjs/toolkit";

export const stuSlice = createSlice({

    name: 'student',

    initialState: () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return {
                name: "",
                id: "",
                class: "",
                grade: "",
                specialty: "",
                token: ""
            }
        }
        return {
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id"),
            class: localStorage.getItem("class"),
            grade: localStorage.getItem("grade"),
            specialty: localStorage.getItem("specialty"),
            token: token
        }

    },

    reducers: {
        login(state, action) {
            state.name = action.payload.name
            state.id = action.payload.id
            state.class = action.payload.class
            state.grade = action.payload.grade
            state.specialty = action.payload.specialty
            state.token = action.payload.token

            localStorage.setItem("name", state.name as string)
            localStorage.setItem("id", state.id as string)
            localStorage.setItem("class", state.class as string)
            localStorage.setItem("grade", state.grade as string)
            localStorage.setItem("specialty", state.specialty as string)
            localStorage.setItem("token", state.token as string)

        },
        logout(state) {
            state.name = ""
            state.id = ""
            state.class = ""
            state.grade = ""
            state.specialty = ""
            state.token = ""

            localStorage.removeItem("name")
            localStorage.removeItem("id")
            localStorage.removeItem("class")
            localStorage.removeItem("grade")
            localStorage.removeItem("specialty")
            localStorage.removeItem("token")
        }
    }
})

export const { login, logout } = stuSlice.actions