import axios from './api';

const ContentService = {
    async getTrendingAll() {
        const { data } = await axios.get(`/trending/all/day`, {
            params: {
                language: 'en-US',
            },
        });
        return data;
    },
    async getContent(name, type, page) {
        const { data } = await axios.get(`/${name}/${type}`, {
            params: {
                language: 'en-US',
                page: page,
            },
        });
        return data;
    },
    async getDiscover(name, type, page) {
        const { data } = await axios.get(`/discover/${name}`, {
            params: {
                include_adult: false,
                language: 'en-US',
                page: page,
                sort_by: 'popularity.desc',
                ...type && { type },
            },
        });
        return data;
    },
    async searchFor(name, type, page, query) {
        const { data } = await axios.get(`/search/${type}`, {
            params: {
                language: 'en-US',
                query: query, 
                page: page
            },
        });
        return data;
    },
    async getDetail(name, id, page) {
        const { data } = await axios.get(`/${name}/${id}`, {
            params: {
                language: 'en-US',
                page: page,
                append_to_response: 'videos,credits,similar',
            },
        });
        return data;
    },
    async getCastsDetail(name,id) {
        const { data } = await axios.get(`/${name}/${id}`, {
            params: {
                language: 'en-US',
                append_to_response: 'combined_credits,external_ids',
            },
        });
        return data;
    },
    async getListOfGenres(name) {
        const { data } = await axios.get(`/genre/${name}/list`, {
            params: {
                language: 'en-US',
            },
        });
        return data;
    },
    async getGenres(name, id, page) {
        const { data } = await axios.get(`/discover/${name}`, {
            params: {
                language: 'en-US',
                with_genres: id,
                include_adult: false,
                page: page,
                sort_by: 'popularity.desc',
            },
        });
        return data;
    },
};

export default ContentService;
