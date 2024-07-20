import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        isShown: false,
        alertType: 'success', 
        showAlert: false
    },
    reducers: {
        bookmarkedSuccess: (state) => {
            state.isShown = true;
            state.alertType = 'success';
        },
        bookmarkedFailure: (state) => {
            state.isShown = false;
            state.alertType = 'failure';
            state.showAlert = true
        },
        clearAlert: (state) => {
            state.isShown = false;
            state.showAlert = false;
        },
    },
});

export const { bookmarkedSuccess, bookmarkedFailure, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
