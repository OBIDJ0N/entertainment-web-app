import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    loggedIn: false,
    errors: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerAndLoginStart: state => {
            state.isLoading = true;
        },
        registerAndLoginSuccess: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        registerAndLoginFailure: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
            state.loggedIn = false;
        },
    },
});


export const { registerAndLoginStart, registerAndLoginSuccess, registerAndLoginFailure, logOutUser } = authSlice.actions;
export default authSlice.reducer;
