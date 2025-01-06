<template>
    <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" width="90%" height="90%">
        <v-card>
            <v-card-title>
                <span class="headline">Add flight</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="name" label="Flight number" required type="number"></v-text-field>
                    <v-text-field v-model="id_plane" label="Plane ID" required type="number"></v-text-field>
                    <v-text-field v-model="start" type="datetime-local" label="Departure UTC"></v-text-field>
                    <v-select v-model="airport_departure" label="Departure Airport" :items="airportsItems"></v-select>
                    <v-select v-model="airport_arrival" label="Arrival Airport" :items="airportsItems"></v-select>
                    <v-text-field v-model="end" type="datetime-local" label="Arrival UTC"></v-text-field>
                </v-form>
                <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                <v-btn color="blue darken-1" text @click="submitForm">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            valid: false,
            name: '',
            id_plane: '',
            start: '',
            end: '',
            airport_departure: '',
            airport_arrival: '',
            error: '',
            airportsItems: [],
            airports: []
        };
    },
    mounted() {
        this.fetchAirports();
    },
    methods: {
        close() {
            this.$emit('close');
        },
        async fetchAirports() {
            try {
                const response = await fetch(`http://localhost:4000/api/airports`);
                if (!response.ok) {
                    throw new Error('Failed to fetch airports');
                }
                const data = await response.json();
                this.airports = data;
                this.airportsItems = data.map(a => a.name);
                console.log(this.airports);
            } catch (error) {
                console.error('Error fetching airports:', error);
                this.error = 'Failed to load airports';
            }
        },
        async submitForm() {
            const flight = {
                id: this.name,
                id_plane: this.id_plane,
                departure_time: this.start,
                arrival_time: this.end,
                id_airport_departure: this.airports.find(e => e.name == this.airport_departure).id,
                id_airport_arrival: this.airports.find(e => e.name == this.airport_arrival).id
            };
            console.log('Form Data:', flight);
            this.error = '';
            try {
                const response = await fetch(`http://localhost:4000/api/flights`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(flight)
                });
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || response.statusText);
                }
                const data = await response.json();
                console.log('API Response:', data);
            } catch (error) {
                console.error('API Error:', error);
                this.error = error.message || 'An error occurred while submitting the form.';
            }
        }
    },
};
</script>