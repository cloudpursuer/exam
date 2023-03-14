import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v2/admin'
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

        }
    }
})

export const{useAddAdminMutation}=adminApi
export default adminApi
