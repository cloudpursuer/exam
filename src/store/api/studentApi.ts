import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/student'
    }),
    endpoints(build){
        return {
            stuLogin:build.mutation({
                query(body){
                    return{
                        url:'login',
                        method:'post',
                        body
                    }
                }
            })
        }
    }
})

export const{useStuLoginMutation}=studentApi
export default studentApi