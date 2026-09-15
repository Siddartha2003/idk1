<template>
    <v-dialog
        v-model="dialog"
        max-width="500">
        <v-card>
            <v-card-title class="dialog-title">
                Add {{ personLabel }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pt-5">
                <v-form
                    ref="personForm"
                    lazy-validation>
                    <!-- Name -->
                    <div class="form-group">
                        <label class="form-label">
                            {{ personLabel }} Name
                        </label>
                        <v-text-field
                            dense
                            outlined
                            hide-details="auto"
                            :placeholder="`Enter ${personLabel.toLowerCase()} name`"
                            v-model="person.name"
                            :rules="[rules.name]"
                        />
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            Date of Birth
                        </label>
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="270px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    dense
                                    outlined
                                    hide-details="auto"
                                    readonly
                                    placeholder="Select date of birth"
                                    v-model="person.dob"
                                    :rules="[rules.dob]"
                                    append-icon="mdi-calendar"
                                    v-on="on"
                                />
                            </template>
                            <v-date-picker
                                v-model="person.dob"
                                @input="menu = false"
                                width="100%">
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            Gender
                        </label>
                        <v-select
                            dense
                            outlined
                            :items="genders"
                            placeholder="Select Gender"
                            v-model="person.gender"
                            :rules="[rules.gender]"
                            :menu-props="{
                                offsetY: true,
                                attach: true
                            }"
                        />
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            Biography
                        </label>
                        <v-textarea
                            outlined
                            rows="3"
                            hide-details="auto"
                            :placeholder="`Enter ${personLabel.toLowerCase()} biography`"
                            v-model="person.bio"
                            :rules="[rules.bio]"
                        />
                    </div>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-6 py-4">
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    height="40"
                    width="100"
                    :loading="loading"
                    @click.prevent="savePerson">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "AddPersonDialog",
    props: {
        value: {
            type: Boolean,
            required: true
        },
        personType: {
            type: String,
            required: true,
            validator: value => {
                return ["actor", "producer"].includes(value);
            }
        }
    },
    data() {
        return {
            menu: false,
            genders: [
                "Male",
                "Female",
                "Other"
            ],
            person: {
                name: "",
                bio: "",
                dob: "",
                gender: ""
            },
            loading: false,
            rules: {
                name: value => {
                    if (!value || !value.trim())
                        return `${this.personLabel} name is required.`;
                    else if(!/^[a-zA-Z ]+$/.test(value))
                        return "Enter valid name.";
                    return true;
                },
                dob: value =>
                    !!value || "Date of birth is required.",
                gender: value =>
                    !!value || "Gender is required.",
                bio: value => {
                    if (!value || !value.trim())
                        return "Bio is required.";
                    else if(!/[a-zA-Z]/.test(value))
                        return "Enter valid bio";
                    return true;
                }
            }
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
        },
        personLabel() {
            return this.personType.charAt(0).toUpperCase()
                + this.personType.slice(1);
        },
        actionName() {
            return `${this.personType}/create${this.personLabel}`;
        }
    },
    methods: {
        closeDialog() {
            this.person = {
                name: "",
                bio: "",
                dob: "",
                gender: ""
            };
            this.menu = false;
            this.dialog = false;
            this.$nextTick(() => {
                if (this.$refs.personForm) {
                    this.$refs.personForm.resetValidation();
                }
            });
        },
        async savePerson() {
            const isValid = this.$refs.personForm.validate();
            if (!isValid) {
                return;
            }
            this.loading = true;
            try {
                const person = await this.$store.dispatch(
                    this.actionName,
                    this.person
                );
                this.$emit("person-added", person);
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
<style scoped>
.dialog-title {
    font-size: 24px;
    font-weight: 600;
}
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
</style>