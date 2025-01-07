<template>
    <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" width="90%" height="90%">
        <v-card>
            <v-card-title>
                <span class="headline">Add Flight</span>
            </v-card-title>
            <v-card-text>

                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="flight.id" label="Flight ID" required type="text"></v-text-field>
                    <v-text-field v-model="flight.id_plane" label="Plane ID" required type="text"></v-text-field>
                    <v-text-field v-model="flight.id_airport_departure" label="Departure Airport ID" required
                        type="text"></v-text-field>
                    <v-text-field v-model="flight.id_airport_arrival" label="Arrival Airport ID" required
                        type="text"></v-text-field>
                    <v-text-field v-model="flight.departure_time" type="datetime-local" label="Departure Time (UTC)"
                        required></v-text-field>
                    <v-text-field v-model="flight.arrival_time" type="datetime-local" label="Arrival Time (UTC)"
                        required></v-text-field>

                </v-form>
                <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Close</v-btn>

                <v-btn color="blue darken-1" text :disabled="!valid" @click="submitFlight">
                    Submit
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/api/index.js';

defineProps({
    dialog: {
        type: Boolean,
        required: true,
    },
});

const valid = ref(false);
const flight = ref({
    id: '',
    id_plane: '',
    id_airport_departure: '',
    id_airport_arrival: '',
    departure_time: '',
    arrival_time: '',
});

const emit = defineEmits(['close', 'update:dialog']);

const close = () => {
    emit('close');
};

const submitFlight = async () => {
    try {
        await apiClient.post('/flights', flight.value);
        alert('Flight added successfully!');
        close();
    } catch (error) {
        console.error('Error submitting flight:', error);
        alert('Failed to add flight. Please try again.');
    }
};
</script>

<style scoped>
.v-dialog__content {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
