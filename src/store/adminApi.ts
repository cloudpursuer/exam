import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/v1/admin'
    }),
    endpoints(build){
        return {
            addAdmin:build.mutation({
                query(body){
                    return{
                        url:'addadmin',
                        method:'post',
                        body
                    }
                }
            }),
            adminLogin:build.mutation({
                query(body){
                    return{
                        url:'login',
                        method:'post',
                        body,
                    }
                }
            })
        }
    }
})

export const{useAddAdminMutation,useAdminLoginMutation}=adminApi
export default adminApi
