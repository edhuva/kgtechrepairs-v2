import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

//fetch Base Query 
const baseQuery =  fetchBaseQuery({ 
    baseUrl: 'https://kgtechrepairs-api-v2.onrender.com',
    credentials: 'include',
    prepareHeaders: (hearders, { getState }) => {
        const token = getState().auth.token
        if (token) {
            hearders.set("authorization", `Bearer ${token}`)
        }
        return hearders
    },
})

//base Query With Reauth
const baseQueryWithReauth = async (args, api, extraOptions) => {
    //console.log(args) // request url, method, body
    //console.log(api) // signal, dispatch, getState()
    //console.log(extraOptions) // custom like (shout: true)

    let result = await baseQuery(args, api, extraOptions);

    // you can also handle other status codes, too here
    if (result?.error?.status === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            //store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }));

            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = 'Your login has expired.'
            }

            return refreshResult
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['RepairOrder', 'User', 'Employee', 'Customer', 'Invoice', 'RepairRequest', 'Subscriptions', 'Contacts'],
    endpoints: builder => ({})
})