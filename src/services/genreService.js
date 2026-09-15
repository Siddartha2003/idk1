import api from "./api";
export default {
    getGenres() {
        return api.get("/genres");
    }
};
