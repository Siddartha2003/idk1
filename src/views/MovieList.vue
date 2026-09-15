<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn
                    class="primary"
                    @click="$router.push('/create')">
                    Add Movie
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="movie in movies"
                :key="movie.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex justify-center">
                <MovieCard
                    :movie="movie"
                    @explore="openMovieDialog"
                    @edit="editMovie"
                    @delete="confirmDelete"
                />
            </v-col>
        </v-row>
       <MovieDetailsDialog
            v-model="showDialog"
            :movie="selectedMovie"
        />
        <MovieDeleteDialog
            v-model="showDeleteDialog"
            :movie-id="selectedMovieId"
            :movie-name="selectedMovieName"
        />
    </v-container>
</template>
<script>
import MovieCard from "../components/MovieCard.vue";
import MovieDetailsDialog from "../components/dialogs/MovieDetailsDialog.vue";
import MovieDeleteDialog from "../components/dialogs/MovieDeleteDialog.vue";
export default {
    name: "MovieList",
    components:{
        MovieCard,
        MovieDetailsDialog,
        MovieDeleteDialog
    },
    data() {
        return {
            showDialog: false,
            selectedMovie: null,
            showDeleteDialog: false,
            selectedMovieId: null,
            selectedMovieName: ""
        };
    },
    computed: {
        movies() {
            return this.$store.getters["movie/movies"];
        }
    },
    methods:{
        openMovieDialog(movie) {
            this.selectedMovie = movie;
            this.showDialog = true;
        },
        editMovie(id) {
            this.$router.push(`/edit/${id}`);
        },
        confirmDelete(id) {
            const movie = this.movies.find(movie => movie.id === id);
            this.selectedMovieId = id;
            this.selectedMovieName = movie.name;
            this.showDeleteDialog = true;
        }
    },
    async created() {
        await this.$store.dispatch("movie/loadMovies");
    }
}
</script>
