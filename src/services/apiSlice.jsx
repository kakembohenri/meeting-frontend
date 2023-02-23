import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { selectToken } from "./authSlice";

const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://127.0.0.1:8000/api",
        baseUrl: "http://elivecafe.com/meeting/meeting_api",
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState());
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
          },
    }),
    endpoints: (builder) => ({}),
})

export default apiSlice