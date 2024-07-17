import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    items: [],
    movies: [],
    tvs: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchAllStart: state => {
            state.isLoading = true
        },
        searchAllSuccess: (state, action) => {
            state.isLoading = false
            state.items = action.payload
        },
        searchAllFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        searchMovieStart: state => {
            state.isLoading = true
        },
        searchMovieSuccess: (state, action) => {
            state.isLoading = false
            state.movies = action.payload
        },
        searchMovieFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {
    searchAllStart, searchAllSuccess, searchAllFailure,
    searchMovieStart, searchMovieSuccess, searchMovieFailure
} = searchSlice.actions
export default searchSlice.reducer