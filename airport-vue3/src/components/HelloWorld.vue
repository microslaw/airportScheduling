<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="900">
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <v-row>
        <v-col cols="6">
          <v-card class="py-4" color="surface-variant" @click="openForm" prepend-icon="mdi-text-box-outline"
            rel="noopener noreferrer" rounded="lg" subtitle="Enter flight details." target="_blank" title="Add Flight"
            variant="text">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="py-4" color="surface-variant" prepend-icon="mdi-airplane" rel="noopener noreferrer"
            rounded="lg" subtitle="View all flights." target="_blank" title="View Flights" variant="text"
            @click="fetchFlights">
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-list v-if="flights.length > 0">
        <v-list-item v-for="flight in flights" :key="flight.id">
          <v-list-item-content>
            <v-list-item-title>
              Flight ID: {{ flight.id }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ flight.id_airport_departure }} → {{ flight.id_airport_arrival }} | Departure: {{ flight.departure_time
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info">
        No flights available. Add a flight to see it here!
      </v-alert>
    </v-responsive>

    <Form :dialog="isFormOpen" @close="closeForm" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Form from './Form.vue';
import apiClient from '@/api/index.js';
import { getFlights, createFlight } from '@/api/flight.js';

const isFormOpen = ref(false);
const flights = ref([]);

const openForm = () => {
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const fetchFlights = async () => {
  try {
    const response = await apiClient.get('/flights');
    flights.value = response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
  }
};
</script>
