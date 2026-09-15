<template>
    <v-dialog
        v-model="dialog"
        max-width="500">
        <v-card>
            <v-card-title class="headline">
                Delete Movie
            </v-card-title>
            <v-card-text>
                Are you sure you want to delete
                <strong>
                    "{{ movieName }}"
                </strong>
                ?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn
                    color="red"
                    text
                    :loading="loading"
                    @click="confirmDelete">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "MovieDeleteDialog",
    props: {
        value: {
            type: Boolean,
            required: true
        },
        movieId: {
            type: [Number, null],
            default:null
        },
        movieName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        async confirmDelete() {
            this.loading = true;
            try {
                await this.$store.dispatch(
                    "movie/deleteMovie",
                    this.movieId
                );
                this.$emit("deleted");
                this.closeDialog();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        }
    }
};
</script>