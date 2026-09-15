import Vue from "vue";
import Vuex from "vuex";
import movie from "./modules/movie";
import producer from "./modules/producer";
import actor from "./modules/actor";
import genre from "./modules/genre";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        movie,
        producer,
        actor,
        genre
    }
});