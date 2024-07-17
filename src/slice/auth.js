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
        registAndLoginStart: state => {
            state.isLoading = true;
        },
        registAndLoginSuccess: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        registAndLoginFailure: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        logOutUser: state => {
            state.user = null;
            state.loggedIn = false;
        },
    },
});

export const { registAndLoginStart, registAndLoginSuccess, registAndLoginFailure, logOutUser } = authSlice.actions;
export default authSlice.reducer;
