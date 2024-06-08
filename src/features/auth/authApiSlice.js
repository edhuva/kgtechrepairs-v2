import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

//authorization ApiSlice
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        registerCustomer: builder.mutation({
            query: initialRegisterData => ({
                url: '/auth/register',
                method: 'POST',
                body: {
                    ...initialRegisterData
                }
            }),
            invalidatesTags: [
                { type: 'Customer', id: 'LIST' }
            ]
        }),
        registerEmployee: builder.mutation({
            query: initialRegisterData => ({
                url: '/auth/empregister',
                method: 'POST',
                body: {
                    ...initialRegisterData
                }
            }),
            invalidatesTags: [
                { type: 'Employee', id: 'LIST' }
            ]
        }),
        addNewSubscription: builder.mutation({
            query: initialSubscriptionData => ({
                url: '/auth/subscriptions',
                method: 'POST',
                body: {
                    ...initialSubscriptionData
                }
            }),
            invalidatesTags: [
                { type: 'Subscription', id: 'LIST'}
            ]
        }),
        addNewContact: builder.mutation({
            query: initialContactData => ({
                url: '/auth/contacts',
                method: 'POST',
                body: {
                    ...initialContactData
                }
            }),
            invalidatesTags: [
                { type: 'Contact', id: 'LIST'}
            ]
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled}) {
                try {
                     const { data } = await queryFulfilled // cookie cleared
                    dispatch(logOut()) // Logged Out successfully

                    // reset State after logout
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                    return data
                } catch (err) {
                //     console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    const { accessToken } = data; //Token from Refresh cookie
                    dispatch(setCredentials({ accessToken }))

                } catch (err) {
                    // console.log(err)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterCustomerMutation,
    useRegisterEmployeeMutation,
    useAddNewSubscriptionMutation,
    useAddNewContactMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice