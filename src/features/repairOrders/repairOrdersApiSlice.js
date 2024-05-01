import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create repairOrder EntityAdapter
const repairOrdersAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

const initialState = repairOrdersAdapter.getInitialState();

// repairOrders ApiSlice
export const repairOrdersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRepairOrders: builder.query({
            query: () => ({
                url: '/repairorders',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedRepairOrders = responseData.map(repairOrder => {
                    repairOrder.id = repairOrder._id;
                    return repairOrder;
                })
                return repairOrdersAdapter.setAll(initialState, loadedRepairOrders);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'RepairOrder', id: 'LIST' },
                        ...result.ids.map(id => ({  type: 'RepairOrder', id }))
                    ]
                } else return [{ type: 'RepairOrder', id: 'LIST' }]
            }
        }),
        addNewRepairOrder: builder.mutation({
            query: initialRepairOrderData => ({
                url: '/repairorders',
                method: 'POST',
                body: {
                    ...initialRepairOrderData
                }
            }),
            invalidatesTags: [
                { type: 'RepairOrder', id: 'LIST' }
            ]
        }),
        updateRepairOrder: builder.mutation({
            query: initialRepairOrderData => ({
                url: '/repairorders',
                method: 'PATCH',
                body: {
                    ...initialRepairOrderData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'RepairOrder', id: arg.id }
            ]
        }),
        deleteRepairOrder: builder.mutation({
            query: ({ id }) => ({
                url: '/repairorders',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'RepairOrder', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetRepairOrdersQuery,
    useAddNewRepairOrderMutation,
    useUpdateRepairOrderMutation,
    useDeleteRepairOrderMutation
} = repairOrdersApiSlice;

//return the query result object
export const selectRepairOrdersResult = repairOrdersApiSlice.endpoints.getRepairOrders.select();

//create memoized selector 
const selectRepairOrdersData = createSelector(
    selectRepairOrdersResult,
    repairOrdersResult => repairOrdersResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with  aliases using destructuring
export const {
    selectAll: selectAllRepairOrders,
    selectById: selectRepairOrderById,
    selectIds: selectRepairOrdersIds
} = repairOrdersAdapter.getSelectors(state => selectRepairOrdersData(state) ?? initialState)