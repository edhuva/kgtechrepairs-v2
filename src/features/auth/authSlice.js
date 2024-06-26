import { createSlice } from "@reduxjs/toolkit";

//authorization Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

//actions
export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

//select CurrentToke
export const selectCurrentToken = (state) => state.auth.token