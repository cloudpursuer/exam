import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const examApi = createApi({
    reducerPath: 'examApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/v1/exam'
    }),
    endpoints(build){
        return {
            getRecentExam:build.query({
                query(){
                    return{
                        url:'recent',
                        method:'get',
                    }
                }
            }),
            getAllExam:build.mutation({
                query(body){
                    return{
                        url:'all',
                        method:'post',
                        body
                    }
                }
            }),
            addOneExam:build.mutation({
                query(body){
                    return{
                        url:'addone',
                        method:'post',
                        body
                    }
                }
            }),
            delOneExam:build.mutation({
                query(body){
                    return{
                        url:'delone',
                        method:'post',
                        body
                    }
                }
            }),
            mutExamInfo:build.mutation({
                query(body){
                    return{
                        url:'mut',
                        method:'post',
                        body
                    }
                }
            }),
            submitExam:build.mutation({
                query(body){
                    return{
                        url:'submit',
                        method:'post',
                        body
                    }
                }
            }),
        }
    }
})

export const { useAddOneExamMutation,
    useGetAllExamMutation,
    useGetRecentExamQuery,
    useDelOneExamMutation,
    useMutExamInfoMutation,
    useSubmitExamMutation
} = examApi
export default examApi