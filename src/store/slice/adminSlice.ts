import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    
    name: 'auth',

    initialState: () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return {
                isAdmin: false,
                token: null,
                position:null,
                expirationTime:0
            }
        }
        return {
            isAdmin: true,
            token: token,
            position:localStorage.getItem("position") ,
            expirationTime:+localStorage.getItem("expirationTime")!
        }
    },

    reducers: {
        login(state, action) {
            state.isAdmin = true
            state.token = action.payload.token
            state.position=action.payload.position

            const currentTime = Date.now()
            const timeout = 1000*60*60*24*7 //登录有效期设为7天,应与jwt有效期保持一致
            
            state.expirationTime = currentTime + timeout
            localStorage.setItem("expirationTime",state.expirationTime+'')
            localStorage.setItem('token', state.token as string)
            localStorage.setItem("position",state.position as string)
        },
        logout(state) {
            state.isAdmin = false
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem("expirationTime")
            localStorage.removeItem("position")
        }
    }
})


export const { login, logout } = adminSlice.actions