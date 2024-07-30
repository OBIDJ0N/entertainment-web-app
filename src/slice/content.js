import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errors: null,
    items: [],
    popularMovies: [],
    popularTvs: [],
    topRatedMovies: [],
    topRatedTvs: [],
    movies: [],
    tvs: [],
    details: null,
    castsDetails: null,
    listOfGenres: [],
    genres: []
};

const handleStart = (state) => {
    state.isLoading = true;
};

const handleSuccess = (state, action, key) => {
    state.isLoading = false;
    state[key] = action.payload;
};

const handleFailure = (state, action) => {
    state.isLoading = false;
    state.errors = action.payload;
};

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        getTrendingStart: handleStart,
        getTrendingSuccess: (state, action) => handleSuccess(state, action, 'items'),
        getTrendingFailure: handleFailure,

        getPopularStart: handleStart,
        getPopularSuccess: (state, action) => handleSuccess(state, action, 'popularMovies'),
        getPopularFailure: handleFailure,

        getPopularTvsStart: handleStart,
        getPopularTvsSuccess: (state, action) => handleSuccess(state, action, 'popularTvs'),
        getPopularTvsFailure: handleFailure,

        getTopRatedMovieStart: handleStart,
        getTopRatedMovieSuccess: (state, action) => handleSuccess(state, action, 'topRatedMovies'),
        getTopRatedMovieFailure: handleFailure,

        getTopRatedTvsStart: handleStart,
        getTopRatedTvsSuccess: (state, action) => handleSuccess(state, action, 'topRatedTvs'),
        getTopRatedTvsFailure: handleFailure,

        getMoviesStart: handleStart,
        getMoviesSucces: (state, action) => handleSuccess(state, action, 'movies'),
        getMoviesFailure: handleFailure,

        getTvsStart: handleStart,
        getTvsSucces: (state, action) => handleSuccess(state, action, 'tvs'),
        getTvsFailure: handleFailure,

        getDetailsStart: handleStart,
        getDetailsSuccess: (state, action) => handleSuccess(state, action, 'details'),
        getDetailsFailure: handleFailure,

        getCastsDetailsStart: handleStart,
        getCastsDetailsSuccess: (state, action) => handleSuccess(state, action, 'castsDetails'),
        getCastsDetailsFailure: handleFailure,

        getListOfGenresStart: handleStart,
        getListOfGenresSuccess: (state, action) => handleSuccess(state, action, 'listOfGenres'),
        getListOfGenresFailure: handleFailure,

        getGenresStart: handleStart,
        getGenresSuccess: (state, action) => handleSuccess(state, action, 'genres'),
        getGenresFailure: handleFailure,
    },
});

export const { 
    getTrendingStart, getTrendingSuccess, getTrendingFailure, 
    getPopularStart, getPopularSuccess, getPopularFailure, 
    getPopularTvsStart, getPopularTvsSuccess, getPopularTvsFailure, 
    getTopRatedMovieStart, getTopRatedMovieSuccess, getTopRatedMovieFailure, 
    getTopRatedTvsStart, getTopRatedTvsSuccess, getTopRatedTvsFailure,
    getMoviesStart, getMoviesSucces, getMoviesFailure,
    getTvsStart, getTvsSucces, getTvsFailure ,
    getDetailsStart, getDetailsSuccess, getDetailsFailure,
    getCastsDetailsStart, getCastsDetailsSuccess, getCastsDetailsFailure,
    getListOfGenresStart, getListOfGenresSuccess, getListOfGenresFailure,
    getGenresStart, getGenresSuccess, getGenresFailure
} = contentSlice.actions;

export default contentSlice.reducer;
