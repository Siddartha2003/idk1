import api from "./api";
export default {
    getMovies() {
        return api.get("/movies");
    },
    getMovieById(id) {
        return api.get(`/movies/${id}`);
    },
    createMovie(formData) {
        return api.post("/movies", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateMovie(id, formData) {
        return api.put(`/movies/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    deleteMovie(id) {
        return api.delete(`/movies/${id}`);
    }
};
