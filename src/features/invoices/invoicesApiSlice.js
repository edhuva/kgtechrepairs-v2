import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create invoices EntityAdapter
const invoicesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.paid === b.paid) ? 0 : a.paid ? 1 : -1
});

const initialState = invoicesAdapter.getInitialState();

//invoices ApiSlice
export const invoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInvoices: builder.query({
            query: () => ({
                url: '/invoices',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedInvoices = responseData.map(invoice => {
                    invoice.id = invoice._id;
                    return invoice;
                })
                return invoicesAdapter.setAll(initialState, loadedInvoices);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Invoice', id: 'LIST' },
                        ...result.ids.map(id => ({  type: 'Invoice', id }))
                    ]
                } else return [{ type: 'Invoice', id: 'LIST' }]
            }
        }),
        addNewInvoice: builder.mutation({
            query: initialInvoiceData => ({
                url: '/invoices',
                method: 'POST',
                body: {
                    ...initialInvoiceData
                }
            }),
            invalidatesTags: [
                { type: 'Invoice', id: 'LIST'}
            ]
        }),
        updateInvoice: builder.mutation({
            query: initialInvoiceData => ({
                url: '/invoices',
                method: 'PATCH',
                body: {
                    ...initialInvoiceData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Invoice', id: arg.id }
            ]
        }),
        deleteInvoice: builder.mutation({
            query: ({ id }) => ({
                url: '/invoices',
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
    useGetInvoicesQuery,
    useAddNewInvoiceMutation,
    useUpdateInvoiceMutation,
    useDeleteInvoiceMutation
} = invoicesApiSlice;

//return the query result object
export const selectInvoicesResult = invoicesApiSlice.endpoints.getInvoices.select();

//create memoized selector 
const selectInvoicesData = createSelector(
    selectInvoicesResult,
    invoicesResult => invoicesResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with  aliases using destructuring
export const {
    selectAll: selectAllInvoices,
    selectById: selectInvoiceById,
    selectIds: selectInvoicesIds
} = invoicesAdapter.getSelectors(state => selectInvoicesData(state) ?? initialState)

