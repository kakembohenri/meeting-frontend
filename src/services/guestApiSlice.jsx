import apiSlice from "./apiSlice";

const guestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGuests: builder.query({
            query: () => '/guest-preachers',
            
        }),
        createGuests: builder.mutation({
            query: (body) => ({
                url: '/guest-preacher',
                method: 'POST',
                body
            })
        }),
        updateGuest: builder.mutation({
            query: (body) => ({
                url: '/guest-preacher',
                method: 'PUT',
                body
            })
        }),
        deleteGuest: builder.mutation({
            query: (id) => ({
                url: `/guest-preacher/${id}`,
                method: 'DELETE',
            })
        })
        
    })
})

export const {useGetGuestsQuery, useCreateGuestsMutation, useUpdateGuestMutation, useDeleteGuestMutation} = guestApiSlice