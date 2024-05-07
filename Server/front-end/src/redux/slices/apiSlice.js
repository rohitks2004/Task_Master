import {createApi , fetchBaseQuery} from'@reduxjs/toolkit/query/react';

const API_URL ="http://localhost:8800/api" ;

const baseQuery = fetchBaseQuery({baseUrl: API_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:[],
    endpoints: (builder) => ({})
})
// export const {useLoginMutation} = apiSlice;

// We can extract other slices like this and use them in our components

