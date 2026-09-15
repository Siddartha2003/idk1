<template>
    <v-dialog
        v-model="dialog"
        max-width="550">
        <v-card v-if="movie"> 
            <v-card-title class="dialog-header">
                <span class="movie-title">
                    {{ movie.name }}
                </span>
            </v-card-title>
            <v-divider/>
            <div class="poster-container">
                <v-img
                    :src="movie.coverImage"
                    contain
                    height="260"
                    class="ma-2"
                />
            </div>
            <v-divider/>
            <v-card-text>
                <div class="movie-info">
                    <div class="info-row">
                        <span class="label">Year</span>
                        <span>{{ movie.yearOfRelease }}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Producer</span>
                        <span>{{ movie.producer.name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Actors</span>
                        <span>{{ actorNames }}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Genres</span>
                        <span>{{ genreNames }}</span>
                    </div>
                </div>
                <v-divider class="my-4"/>
                <div>
                    <h3 class="plot-title">
                        Plot
                    </h3>
                    <p class="plot">
                        {{ movie.plot }}
                    </p>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color= grey 
                    @click="closeDialog">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "MovieDetailsDialog",
    props: {
        value: {
            type: Boolean,
            required: true
        },
        movie: {
            type: Object,
            default: null
        }
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        },
        actorNames() {
            if (!this.movie) {
                return "";
            }
            return this.movie.actors
                .map(function (actor) {
                    return actor.name;
                })
                .join(", ");
        },
        genreNames() {
            if (!this.movie) {
                return "";
            }
            return this.movie.genres
                .map(function (genre) {
                    return genre.name;
                })
                .join(", ");
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        }
    }
}
</script>
<style scoped>
.movie-title{
    font-size:28px;
    font-weight:500;
}
.movie-info{
    display:flex;
    flex-direction:column;
    gap:16px;
}
.info-row{
    display:flex;
}
.label{
    width:110px;
    font-weight:600;
    color:#424242;
}
.plot-title{
    margin-bottom:10px;
    font-size:18px;
    font-weight:600;
    color:#424242;
}
.plot{
    color:#616161;
    line-height:1.7;
}
</style>