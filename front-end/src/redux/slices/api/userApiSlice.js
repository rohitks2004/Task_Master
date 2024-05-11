import { apiSlice } from "../apiSlice";

const AUTH_URL="/user";

export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/profile`,
                method:"PUT",
                body:data,
                credentials:"include",


            })
        }),

        getTeamList:builder.query({
            query:()=>({
                url:`${AUTH_URL}/get-team`,
                method:"GET",
                credentials:"include",


            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`${AUTH_URL}/${id}`,
                method:"DELETE",
                credentials:"include",


            })
        }),
        userAction:builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/${data.id}`,
                method:"PUT",
                body:data,
                credentials:"include",


            })
        }),
        getNotifications:builder.query({
            query:()=>({
                url:`${AUTH_URL}/notifications`,
                method:"GET",
                
                credentials:"include",


            })
        }),
        markNotisAsRead:builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/read-noti?isReadtype=${data.type}&${data.id}`,
                method:"PUT",
                body:data,
                credentials:"include",
            })
        }),
        changePassword:builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/change-password`,
                method:"PUT",
                body:data,
                credentials:"include",
            })
        }),

    })
})

export const{useUpdateUserMutation,useGetTeamListQuery,useDeleteUserMutation,useUserActionMutation,useGetNotificationsQuery,useMarkNotisAsReadMutation,useChangePasswordMutation}=userApiSlice