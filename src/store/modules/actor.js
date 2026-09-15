import actorService from "../../services/actorService";
export default {
    namespaced: true,
    state: {
        actors: []
    },
    getters: {
        actors: state => state.actors
    },
    mutations: {
        SET_ACTORS(state, actors) {
            state.actors = actors;
        },
        ADD_ACTOR(state, actor) {
            state.actors.push(actor);
        }
    },
    actions: {
        async loadActors({ commit }) {
            const response = await actorService.getActors();
            commit("SET_ACTORS", response.data);
        },
        async createActor({ commit }, actor) {
            const response = await actorService.createActor(actor);
            commit("ADD_ACTOR", response.data);
            return response.data;
        }
    }
};