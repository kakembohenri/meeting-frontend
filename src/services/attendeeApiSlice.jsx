import apiSlice from "./apiSlice";

const attendeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendee: builder.query({
            query: () => '/attendees',
            
        }),
        getAttendeesByMeetingId: builder.mutation({
            query: (id) => ({
                url: `/meeting-attendees/${id}`,
                method: 'GET'
            })
        }),
        createAttendee: builder.mutation({
            query: (body) => ({
            url: '/attendees',
            method: 'POST',
            body
        }),
    }),
        deleteAttendee: builder.mutation({
            query: (id) => ({
            url: `/attendees/${id}`,
            method: 'DELETE',
            
        }),
    }),
    addUserToAttendee: builder.mutation({
        query: (body) => ({
            url: '/add/old-user/to-attendee',
            method: 'POST',
            body
        })
    })
    })
})

export const 
{useGetAttendeeQuery,
useGetAttendeesByMeetingIdMutation,
useCreateAttendeeMutation,
useDeleteAttendeeMutation,
useAddUserToAttendeeMutation
} = attendeeApiSlice