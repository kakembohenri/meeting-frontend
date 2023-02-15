import { createSlice } from "@reduxjs/toolkit";

export const meetingSlice = createSlice({
    name: "meeting",
    initialState: {
      currentMeeting: null,
      meetings: []
    },
    reducers: {
      setCurrentMeeting: (state, action) => {
        state.currentMeeting = action.payload.currentMeeting;
        localStorage.setItem(
          "currentMeeting",
          JSON.stringify(action.payload.currentMeeting)
        );
        
      },
      setMeetings: (state, action) => {
        state.meetings = action.payload.meetings;
        localStorage.setItem(
          "meetings",
          JSON.stringify(action.payload.meetings)
        );
      }
    },
  });
  
  export const { setCurrentMeeting, setMeetings } = meetingSlice.actions;
  
  export const selectCurrentMeeting = (state) => state.meeting.currentMeeting;
  export const selectMeetings = (state) => state.meeting.meetings
  
  export default meetingSlice.reducer;