const TASKS_URL = "/task";
import {apiSlice} from '../apiSlice.js'

export const taskApiSlice = apiSlice.injectEndpoints({
endpoints: (builder) => ({
getDasboardStats: builder.query({
query: () => ({
url: `${TASKS_URL}/dashboard`,
method: "GET",
credentials: "include",
}),
}),
getAllTask: builder.query({
    query: (strQuery, isTrashed, search) => ({
      url: `${TASKS_URL}/fetch`,
      method: "GET",
      credentials: "include",
    }),
  }),

createTask: builder.mutation({
    query: (data) => ({
    url: `${TASKS_URL}/create`,
    method: "POST",
    body: data,
    credentials: "include",
    }),

    }),

duplicateTask: builder.mutation({
    query: (id) => ({
    url: `${TASKS_URL}/duplicate/${id}`,
    method: "POST",
    body: {},
    credentials: "include",
    }),
    }),

updateTask: builder.mutation({
      query: (data) => ({
      url: `${TASKS_URL}/update/${data._id}`,
      method: "PUT",
      body: data,
      credentials: "include",
      }),
     })
,
trashtask:builder.mutation({
  query:({id})=>({
    url:`${TASKS_URL}/${id}`,
    method:'PUT',
    credentials:"include"
  })
})
,
createSubTask:builder.mutation({
  query:({data,id})=>({
    url:`${TASKS_URL}/create-subtask/${id}`,
    method:"PUT",
    body:data,
    credentials:"include",
  })
})
,
getSingleTask:builder.query({
  query:(id)=>({
url:`${TASKS_URL}/${id}`,
method:"GET",
credentials:"incldue",
  })
})
}),
});

export const {
  useGetDasboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useTrashtaskMutation,
  useCreateSubTaskMutation,
  useGetSingleTaskQuery
}= taskApiSlice
