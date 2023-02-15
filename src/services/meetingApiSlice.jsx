import apiSlice from "./apiSlice";

const meetingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentMeeting: builder.query({
            query: () => '/current-meeting',
            // transformResponse: (resp) => {
            //     console.log(resp)
            //     return resp.data
            // }
        }),
        getMeetings: builder.query({
            query: () => '/meetings'
        }),
        createMeeting: builder.mutation({
            query: (body) => ({
                url: '/meetings',
                method: 'POST',
                body
            })
        }),
        updateMeeting: builder.mutation({
            query: (body) => ({
                url: '/meetings',
                method: 'PUT',
                body
            })
        }),
        deleteMeeting: builder.mutation({
            query: (id) => ({
                url: `/meetings/${id}`,
                method: 'DELETE'
            })
        }),
        setCurrentMeeting: builder.mutation({
            query: (id) => ({
                url: `/set-current-meeting/${id}`,
                method: "POST"
            })
        }),
        uploadMinutes: builder.mutation({
            query: (body) => ({
                url: "/meetings/minutes",
                method: 'PUT',
                body
            })
        }),
        downloadMinutes: builder.mutation({
            query: (fileName) => ({
                url: `/download/minutes/${fileName}`,
                method: "GET",
            })
        })
    })
})

export const {useGetCurrentMeetingQuery, useGetMeetingsQuery, useCreateMeetingMutation, useUpdateMeetingMutation, useDeleteMeetingMutation, useSetCurrentMeetingMutation, useUploadMinutesMutation, useDownloadMinutesMutation} = meetingApiSlice