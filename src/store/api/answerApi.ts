import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const answerApi = createApi({
    reducerPath: 'answerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/v1/answer'
    }),
    endpoints(build){
        return {
            getRecentExam:build.query({
                query(){
                    return 'recent'
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
} = answerApi
export default answerApi