import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create subscriptions EntityAdapter
const subscriptionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1
});

const initialState = subscriptionsAdapter.getInitialState();

//subscriptions ApiSlice
export const subscriptionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptions: builder.query({
            query: () => ({
                url: '/subscriptions',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedSubscriptions = responseData.map(subscription => {
                    subscription.id = subscription._id;
                    return subscription;
                })
                return subscriptionsAdapter.setAll(initialState, loadedSubscriptions);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Subscription', id: 'LIST' },
                        ...result.ids.map(id => ({  type: 'Subscription', id }))
                    ]
                } else return [{ type: 'Subscription', id: 'LIST' }]
            }
        }),
        updateSubscription: builder.mutation({
            query: initialSubscriptionData => ({
                url: '/subscriptions',
                method: 'PATCH',
                body: {
                    ...initialSubscriptionData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Subscription', id: arg.id }
            ]
        }),
        deleteSubscription: builder.mutation({
            query: ({ id }) => ({
                url: '/subscriptions',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Subscription', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetSubscriptionsQuery,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation
} = subscriptionsApiSlice;

//return the query result object
export const selectSubscriptionsResult = subscriptionsApiSlice.endpoints.getSubscriptions.select();

//create memoized selector 
const selectSubscriptionsData = createSelector(
    selectSubscriptionsResult,
    subscriptionsResult => subscriptionsResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with  aliases using destructuring
export const {
    selectAll: selectAllSubscriptions,
    selectById: selectSubscriptionById,
    selectIds: selectSubscriptionsIds
} = subscriptionsAdapter.getSelectors(state => selectSubscriptionsData(state) ?? initialState)