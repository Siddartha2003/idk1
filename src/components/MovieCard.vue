<template>
    <v-card class="movie-card">
        <v-img
            :src="movie.coverImage"
            height="180"
            cover
        />
        <v-card-title class="movie-title">
            {{ movie.name }}
        </v-card-title>
        <v-card-text>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <div
                        class="movie-description"
                        v-bind="attrs"
                        v-on="on">
                        {{ movie.plot }}
                    </div>
                </template>
                <span class="plot-tooltip">
                    {{ movie.plot }}
                </span>
            </v-tooltip>
        </v-card-text>
        <v-card-actions>
            <v-btn
                icon
                color="primary"
                title="Explore"
                @click="$emit('explore', movie)">
                <v-icon>
                    mdi-information
                </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                icon
                color="secondary"
                title="Edit"
                @click="$emit('edit', movie.id)">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-btn
                icon
                color="red"
                title="Delete"
                @click="$emit('delete', movie.id)">
                <v-icon>
                    mdi-delete
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "MovieCard",
    props: {
        movie: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
.movie-card{
    height:100%;
    width: 320px;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.5) !important;
    display: flex;
    flex-direction: column;
}
.movie-title {
    height: 80px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: normal;
    overflow-wrap: normal;
    white-space: normal;
}
.movie-description{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
    height: 48px;
}
.v-card-actions{
    margin-top: auto;
}
.plot-tooltip{
    max-width:200px;
    white-space:normal;
    line-height:1.5;
    font-size:14px;
    color: black;
}
</style>