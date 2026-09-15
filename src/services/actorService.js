import api from "./api";
export default {
    getActors() {
        return api.get("/actors");
    },
    createActor(actor) {
        return api.post("/actors", actor);
    }
};
