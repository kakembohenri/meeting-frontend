import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    sendLogOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/users/me",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return userAdapter.upsertOne(initialState, response);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSendLogOutMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApiSlice;
