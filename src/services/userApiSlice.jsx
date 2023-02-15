import apiSlice from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            // transformResponse: (resp) => {
            //     console.log(resp)
            //     return resp.data
            // }
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'PUT',
                body
            })
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: '/users/changePassword',
                method: 'PUT',
                body
            })
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body
            })
        }),
        createAdmin: builder.mutation({
            query: (body) => ({
                url: '/admin/users',
                method: 'POST',
                body
            })
        }),
        deleteUser: builder.mutation({
            query: (body) => ({
                url: '/users/delete',
                method: 'DELETE',
                body
            })
        })
    })
})

export const {useGetUsersQuery, useUpdateUserMutation, useChangePasswordMutation, useCreateUserMutation, useCreateAdminMutation, useDeleteUserMutation} = userApiSlice