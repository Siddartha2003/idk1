import Vue from "vue";
import movieService from "../../services/movieService";
export default {
    namespaced: true,
    state: {
        movies: []
    },
    getters: {
        movies: state => state.movies
    },
    mutations: {
        SET_MOVIES(state, movies) {
            state.movies = movies;
        },
        ADD_MOVIE(state, movie) {
            state.movies.push(movie);
        },
        UPDATE_MOVIE(state, updatedMovie) {
            const index = state.movies.findIndex(
                movie => movie.id === updatedMovie.id
            );
            if (index !== -1) {
                Vue.set(state.movies, index, updatedMovie);
            }
        },
        DELETE_MOVIE(state, id) {
            state.movies = state.movies.filter(
                movie => movie.id !== id
            );
        }
    },
    actions: {
        async loadMovies({ commit }) {
            const response = await movieService.getMovies();
            commit("SET_MOVIES", response.data);
        },
        async createMovie({ commit }, formData) {
            const response = await movieService.createMovie(formData);
            commit("ADD_MOVIE", response.data);
            return response;
        },
        async updateMovie({ commit }, { id, formData }) {
            await movieService.updateMovie(id, formData);
            const response = await movieService.getMovieById(id);
            commit("UPDATE_MOVIE", response.data);
        },
        async deleteMovie({ commit }, id) {
            await movieService.deleteMovie(id);
            commit("DELETE_MOVIE", id);
        }
    }
};