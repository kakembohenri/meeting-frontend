import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
      token: localStorage.getItem("token") || null,
      user: null,
    },
    reducers: {
      setCredentials: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem(
          "token",
          action.payload.token
        );
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
        
      },
      logout: (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },
      setUser: (state, action) => {
        state.user = action.payload.user
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(action.payload.user))
      }
    },
  });
  
  export const { setCredentials, logout, setUser } = authSlice.actions;
  
  export const selectToken = (state) => state.auth.token;
  export const selectUser = (state) => state.auth.user;
  
  export default authSlice.reducer;