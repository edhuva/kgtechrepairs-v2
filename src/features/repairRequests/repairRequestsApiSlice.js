import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create repairRequests EntityAdapter
const repairRequestsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1
});

const initialState = repairRequestsAdapter.getInitialState();

//repairRequests ApiSlice
export const repairRequestsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRepairRequests: builder.query({
            query: () => ({
                url: '/repairrequests',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedRepairRequests = responseData.map(repairrequest => {
                    repairrequest.id = repairrequest._id;
                    return repairrequest;
                })
                return repairRequestsAdapter.setAll(initialState, loadedRepairRequests);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'RepairRequest', id: 'LIST' },
                        ...result.ids.map(id => ({  type: 'RepairRequest', id }))
                    ]
                } else return [{ type: 'RepairRequest', id: 'LIST' }]
            }
        }),
        addNewRepairRequest: builder.mutation({
            query: initialRepairRequestData => ({
                url: '/repairrequests',
                method: 'POST',
                body: {
                    ...initialRepairRequestData
                }
            }),
            invalidatesTags: [
                {type: 'RepairRequest', id: 'LIST'}
            ]
        }),
        updateRepairRequest: builder.mutation({
            query: initialRepairRequestData => ({
                url: '/repairrequests',
                method: 'PATCH',
                body: {
                    ...initialRepairRequestData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'RepairRequest', id: arg.id}
            ]
        }),
        deleteRepairRequest: builder.mutation({
            query: ({ id }) => ({
                url: '/repairrequests',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'RepairRequest', id: arg.id}
            ]
        })
    }),
})

export const {
    useGetRepairRequestsQuery,
    useAddNewRepairRequestMutation,
    useUpdateRepairRequestMutation,
    useDeleteRepairRequestMutation
} = repairRequestsApiSlice;

//return the query result object
export const selectRepairRequestsResult = repairRequestsApiSlice.endpoints.getRepairRequests.select();

//create memoized selector 
const selectRepairRequestsData = createSelector(
    selectRepairRequestsResult,
    repairRequestsResult => repairRequestsResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with  aliases using destructuring
export const {
    selectAll: selectAllRepairRequests,
    selectById: selectRepairRequestById,
    selectIds: selectRepairRequestssIds
} = repairRequestsAdapter.getSelectors(state => selectRepairRequestsData(state) ?? initialState)