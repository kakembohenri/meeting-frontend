import { createSlice } from "@reduxjs/toolkit";

export const guestSlice = createSlice({
    name: "guest",
    initialState: {
      currentGuest: null,
      guests: []
    },
    reducers: {
      setCurrentGuest: (state, action) => {
        state.currentGuest = action.payload.currentGuest;
        localStorage.setItem(
          "currentGuest",
          JSON.stringify(action.payload.currentGuest)
        );
        
      },
    },
  });
  
  export const { setCurrentGuest } = guestSlice.actions;
  
  export const selectCurrentGuest = (state) => state.guest.currentGuest;
  
  export default guestSlice.reducer;