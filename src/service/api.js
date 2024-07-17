import axios from 'axios';

const TMDB_API = process.env.REACT_APP_PUBLIC_KEY;

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_key: TMDB_API,
    },
});

export default axiosInstance;
