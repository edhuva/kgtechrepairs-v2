import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create contacts EntityAdapter
const contactsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1
});

const initialState = contactsAdapter.getInitialState();

//contacts ApiSlice
export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => ({
                url: '/contacts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedContacts = responseData.map(contact => {
                    contact.id = contact._id;
                    return contact;
                })
                return contactsAdapter.setAll(initialState, loadedContacts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Contact', id: 'LIST' },
                        ...result.ids.map(id => ({  type: 'Contact', id }))
                    ]
                } else return [{ type: 'Contact', id: 'LIST' }]
            }
        }),
        updateContact: builder.mutation({
            query: initialContactData => ({
                url: '/contacts',
                method: 'PATCH',
                body: {
                    ...initialContactData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Contact', id: arg.id }
            ]
        }),
        deleteContact: builder.mutation({
            query: ({ id }) => ({
                url: '/contacts',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Contact', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetContactsQuery,
    useUpdateContactMutation,
    useDeleteContactMutation
} = contactsApiSlice;

//return the query result object
export const selectContactsResult = contactsApiSlice.endpoints.getContacts.select();

//create memoized selector 
const selectContactsData = createSelector(
    selectContactsResult,
    contactsResult => contactsResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with  aliases using destructuring
export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    selectIds: selectContactsIds
} = contactsAdapter.getSelectors(state => selectContactsData(state) ?? initialState)