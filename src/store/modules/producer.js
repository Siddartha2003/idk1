import producerService from "../../services/producerService";
export default {
    namespaced: true,
    state: {
        producers: []
    },
    getters: {
        producers: state => state.producers
    },
    mutations: {
        SET_PRODUCERS(state, producers) {
            state.producers = producers;
        },
        ADD_PRODUCER(state, producer) {
            state.producers.push(producer);
        }
    },
    actions: {
        async loadProducers({ commit }) {
            const response = await producerService.getProducers();
            commit("SET_PRODUCERS", response.data);
        },
        async createProducer({ commit }, producer) {
            const response = await producerService.createProducer(producer);
            commit("ADD_PRODUCER", response.data);
            return response.data;
        }
    }
};