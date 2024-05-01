import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//create employee entityAdpter
const employeesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt ? -1 : 1
});

const initialState = employeesAdapter.getInitialState();

// employeesApiSlice
export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => ({
                url: '/employees',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedEmployees = responseData.map(employee => {
                    employee.id = employee._id
                    return employee
                })
                return employeesAdapter.setAll(initialState, loadedEmployees);
            },
            providesTags: (result, error, erg) => {
                if (result?.ids) {
                    return [
                        { type: 'Employee', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Employee', id }))
                    ]
                } else return [{ type: 'Employee', id: 'LIST'}]
            }
        }),
        addNewEmployee: builder.mutation({
            query: initialEmployeeData => ({
                url: '/employees',
                method: 'POST',
                body: {
                    ...initialEmployeeData
                }
            }),
            invalidatesTags: [
                { type: 'Employee', id: 'LIST'}
            ]
        }),
        updateEmployee: builder.mutation({
            query: initialEmployeeData => ({
                url: '/employees',
                method: 'PATCH',
                body: {
                    ...initialEmployeeData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Employee', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetEmployeesQuery,
    useAddNewEmployeeMutation,
    useUpdateEmployeeMutation
} = employeesApiSlice;

//return query result object 
export const selectEmployeeResult = employeesApiSlice.endpoints.getEmployees.select();

//create memoized selector 
const selectEmployeeData = createSelector(
    selectEmployeeResult,
    employeeResult => employeeResult.data //normalized state object with ids & entities
);

//getSelectors creates selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllEmployees,
    selectById: selectEmployeeById,
    selectIds: selectEmployeesIds
} = employeesAdapter.getSelectors(state => selectEmployeeData(state) ?? initialState)