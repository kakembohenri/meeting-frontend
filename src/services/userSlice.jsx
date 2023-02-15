import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
      user: null,
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
        
      },
    },
  });
  
  export const { setUser } = userSlice.actions;
  
  export const selectUser = (state) => state.auth.user;
  
  export default userSlice.reducer;