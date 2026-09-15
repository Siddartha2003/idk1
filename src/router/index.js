import Vue from "vue";
import Router from "vue-router";
import MovieList from "@/views/MovieList.vue";
import MovieForm from "@/views/MovieForm.vue";
Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "MovieList",
            component: MovieList
        },
        {
            path: "/create",
            name: "CreateMovie",
            component: MovieForm
        },
        {
            path: "/edit/:id",
            name: "EditMovie",
            component: MovieForm
        }
    ]
});
