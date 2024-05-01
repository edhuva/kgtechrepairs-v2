import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create customer EntityAdapter
const customersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt ? -1 : 1
});

const initialState = customersAdapter.getInitialState();

// customer ApiSlice
export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.query({
            query: () => ({
                url: '/customers',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedCustomers = responseData.map(customer => {
                    customer.id = customer._id
                    return customer
                })
                return customersAdapter.setAll(initialState, loadedCustomers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Customer', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Customer', id }))
                    ]
                } else return [{ type: 'Customer', id: 'LIST'}]
            }
        }), 
        addNewCustomer: builder.mutation({
            query: initialCustomerData => ({
                url: '/customers',
                method: 'POST',
                body: {
                    ...initialCustomerData
                }
            }),
            invalidatesTags: [
                { type: 'Customer', id: 'LIST'}
            ]
        }),
        updateCustomer: builder.mutation({
            query: initialCustomerData => ({
                url: '/customers',
                method: 'PATCH',
                body: {
                    ...initialCustomerData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: arg.id }
            ]
        }),
        
    }),
})

export const {
    useGetCustomersQuery,
    useAddNewCustomerMutation,
    useUpdateCustomerMutation
} = customerApiSlice;

//return the query result object
export const selectCustomerResult = customerApiSlice.endpoints.getCustomers.select();

//create memoized selector
const selectCustomerData = createSelector(
    selectCustomerResult,
    customerResult => customerResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomersIds
} = customersAdapter.getSelectors(state => selectCustomerData(state) ?? initialState)

