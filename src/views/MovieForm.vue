<template>
    <v-container class="ml-80 mr-2">
        <h2 class="mb-6">
            {{ pageTitle }}
        </h2>
        <v-form
            ref="movieForm"
            lazy-validation>
            <div class="form-group inputField">
                <label class="form-label">
                    Movie Name
                </label>
                <v-text-field
                    dense
                    outlined
                    hide-details="auto"
                    placeholder="Enter movie name"
                    v-model="movie.name"
                    :rules="[rules.movieName]"
                />
            </div>
            <div class="form-group">
                <label class="form-label">
                    Year of Release
                </label>
                <v-text-field
                    class="inputField"
                    dense
                    outlined
                    hide-details="auto"
                    type="number"
                    placeholder="Enter release year"
                    v-model="movie.yearOfRelease"
                    :rules="[rules.year]"
                />
            </div>
            <div class="form-group inputField">
                <label class="form-label">
                    Producer
                </label>
                <v-row>
                    <v-col cols="10">
                        <v-select
                            dense
                            outlined
                            :items="producers"
                            placeholder="Select Producer"
                            item-text="name"
                            item-value="id"
                            v-model="movie.producerId"
                            :rules="[rules.producer]"
                            :menu-props="{
                                offsetY: true,
                                attach: true
                            }"
                        />
                    </v-col>
                    <v-col
                        cols="2"
                        class="d-flex align-end"
                        style="padding-bottom: 51px"
                        ml="auto">
                        <v-btn
                            color="primary"
                            block
                            height="40"
                            @click="showProducerDialog = true">
                            Add
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="form-group inputField">
                <label class="form-label">
                    Actors
                </label>
                <v-row>
                    <v-col cols="10">
                        <v-select
                            dense
                            outlined
                            multiple
                            chips
                            small-chips
                            deletable-chips
                            :items="actors"
                            placeholder="Select Actors"
                            item-text="name"
                            item-value="id"
                            v-model="movie.actorIds"
                            :rules="[rules.actors]"
                            :menu-props="{
                                offsetY: true,
                                attach: true,
                                maxHeight: 220
                            }"
                        />
                    </v-col>
                    <v-col
                        cols="2"
                        class="d-flex align-end"
                        style="padding-bottom: 51px">
                        <v-btn
                            color="primary"
                            block
                            height="40"
                            @click="showActorDialog = true">
                            Add
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="form-group inputField">
                <label class="form-label">
                    Genres
                </label>
                <v-select
                    dense
                    outlined
                    multiple
                    chips
                    small-chips
                    deletable-chips
                    :items="genres"
                    placeholder="Select Genres"
                    item-text="name"
                    item-value="id"
                    v-model="movie.genreIds"
                    :rules="[rules.genres]"
                    :menu-props="{
                        offsetY: true,
                        attach: true,
                        maxHeight: 220
                    }"
                />
            </div>
            <div class="form-group inputField">
                <label class="form-label">
                    Plot
                </label>
                <v-textarea
                    dense
                    outlined
                    hide-details="auto"
                    rows="3"
                    placeholder="Enter movie plot"
                    v-model="movie.plot"
                    :rules="[rules.plot]"
                />
            </div>
            <div class="form-group inputField">
                <label class="form-label">
                    Poster
                </label>
                <v-row align="start">
                    <v-col cols="8">
                        <input
                            ref="posterInput"
                            type="file"
                            accept="image/*"
                            style="display:none"
                            @change="selectPoster"
                        >
                        <v-text-field
                            dense
                            outlined
                            readonly
                            placeholder="Choose poster"
                            append-icon="mdi-upload"
                            :value="posterName"
                            :error-messages="posterError"
                            @click="$refs.posterInput.click()"
                        />
                    </v-col>
                    <v-col
                        cols="4"
                        class="d-flex justify-center">
                        <div style="width:150px;height:200px;">
                            <v-img
                                v-if="imagePreview"
                                :src="imagePreview"
                                contain
                                max-width="150"
                                max-height="200"
                            />
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-btn
                color="primary"
                height="42"
                width="180"
                class="mt-4"
                @click="saveMovie">
                {{ pageTitle }}
            </v-btn>
        </v-form>
        <AddPersonDialog
            v-model="showProducerDialog"
            person-type="producer"
            @person-added="producerAdded"
        />
        <AddPersonDialog
            v-model="showActorDialog"
            person-type="actor"
            @person-added="actorAdded"
        />
    </v-container>
</template>
<script>
import AddPersonDialog from "../components/dialogs/AddPersonDialog.vue";
import movieService from "../services/movieService";
export default {
    name: "MovieForm",
    components: {
        AddPersonDialog
    },
    data() {
        return {
            imagePreview: null,
            posterName: "",
            posterError: "",
            movie: {
                name: "",
                yearOfRelease: "",
                producerId: null,
                actorIds: [],
                genreIds: [],
                plot: "",
                coverImage: null
            },
            showProducerDialog: false,
            showActorDialog: false,
            rules: {
                movieName: value => {
                    if (!value || !value.trim())
                        return "Movie name is required.";
                    else if(!/[a-zA-Z]/.test(value))
                        return "Enter valid movie name";
                    return true;
                },
                plot: value => {
                    if (!value || !value.trim())
                        return "Plot is required.";
                    else if(!/[a-zA-Z]/.test(value))
                        return "Enter valid plot";
                    return true;
                },
                year: value => {
                    const currentYear = new Date().getFullYear();
                    if (!value)
                        return "Year of release is required.";
                    if (value < 1888 || value > currentYear)
                        return `Please enter a valid release year.`;
                    return true;
                },
                producer: value =>
                    !!value || "Please select a producer.",
                actors: value =>
                    value.length > 0 || "Please select at least one actor.",
                genres: value =>
                    value.length > 0 || "Please select at least one genre."
            }
        };
    },
    computed: {
        pageTitle() {
            return this.$route.params.id
                ? "Edit Movie"
                : "Create Movie";
        },
        producers() {
            return this.$store.getters["producer/producers"];
        },
        actors() {
            return this.$store.getters["actor/actors"];
        },
        genres() {
            return this.$store.getters["genre/genres"];
        }
    },
    methods: {
        closeDialog() {
            this.producer = {
                name: "",
                bio: "",
                dob: "",
                gender: ""
            };
            this.dialog = false;
        },
        async loadDropdownData() {
            await Promise.all([
                this.$store.dispatch("producer/loadProducers"),
                this.$store.dispatch("actor/loadActors"),
                this.$store.dispatch("genre/loadGenres")
            ]);
        },
        producerAdded(producer) {
            this.movie.producerId = producer.id;
        },
        actorAdded(actor) {
            this.movie.actorIds.push(actor.id);
        },
        selectPoster(event) {
            const file = event.target.files[0];
            this.posterName = "";
            this.posterError = "";
            this.imagePreview = null;
            this.movie.coverImage = null;
            if (!file) {
                return;
            }
            if (!file.type.startsWith("image/")) {
                this.posterName = "";
                this.movie.coverImage = null;
                this.imagePreview = null;
                this.posterError = "Only image files are allowed.";
                event.target.value = "";
                return;
            }
            this.posterName = file.name;
            this.movie.coverImage = file;
            const reader = new FileReader();
            reader.onload = e => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async saveMovie() {
            this.posterError = "";
            const isFormValid = this.$refs.movieForm.validate();
            if (!this.movie.coverImage && !this.imagePreview) {
                this.posterError = "Please upload a poster.";
            }
            if (!isFormValid || (!this.movie.coverImage && !this.imagePreview)) {
                return;
            }
            try {
                const formData = new FormData();
                formData.append("Name", this.movie.name.trim());
                formData.append(
                    "YearOfRelease",
                    this.movie.yearOfRelease
                );
                formData.append(
                    "Plot",
                    this.movie.plot.trim()
                );
                formData.append(
                    "ProducerId",
                    this.movie.producerId
                );
                if (this.movie.coverImage) {
                    formData.append(
                        "PosterImage",
                        this.movie.coverImage
                    );
                }
                this.movie.actorIds.forEach(function (id) {
                    formData.append("ActorIds", id);
                });
                this.movie.genreIds.forEach(function (id) {
                    formData.append("GenreIds", id);
                });
                if (this.$route.params.id) {
                    await this.$store.dispatch(
                        "movie/updateMovie",
                        {
                            id: this.$route.params.id,
                            formData
                        }
                    );
                }
                else {
                    await this.$store.dispatch(
                        "movie/createMovie",
                        formData
                    );
                }
                this.posterName = "";
                this.posterError = "";
                this.imagePreview = null;
                this.$router.push("/");
            }
            catch (error) {
                console.log(error);
            }
        },
        async loadMovie() {
            try {
                const response = await movieService.getMovieById(
                    this.$route.params.id
                );
                const movie = response.data;
                this.movie.name = movie.name;
                this.movie.yearOfRelease = movie.yearOfRelease;
                this.movie.plot = movie.plot;
                this.movie.producerId = movie.producer.id;
                this.movie.actorIds = movie.actors.map(function(actor) {
                    return actor.id;
                });
                this.movie.genreIds = movie.genres.map(function(genre) {
                    return genre.id;
                });
                this.imagePreview = movie.coverImage;
                this.posterName = movie.coverImage.substring(movie.coverImage.indexOf('_')+1);
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        await this.loadDropdownData();
        if (this.$route.params.id) {
            this.loadMovie();
        }
    }
}
</script>
<style scoped>
.form-group {
    margin-bottom: 18px;
}
.form-label {
    display: block;
    margin-bottom: 6px;
    font-size: 15px;
    font-weight: 600;
    color: #424242;
}
.inputField{
    max-width: 70%;
}
</style>