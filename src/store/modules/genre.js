import genreService from "../../services/genreService";
export default {
    namespaced: true,
    state: {
        genres: []
    },
    getters: {
        genres: state => state.genres
    },
    mutations: {
        SET_GENRES(state, genres) {
            state.genres = genres;
        }
    },
    actions: {
        async loadGenres({ commit }) {
            const response = await genreService.getGenres();
            commit("SET_GENRES", response.data);
        }
    }
};