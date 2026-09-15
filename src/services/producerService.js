import api from "./api";
export default {
    getProducers() {
        return api.get("/producers");
    },
    createProducer(producer) {
        return api.post("/producers", producer);
    }
};
