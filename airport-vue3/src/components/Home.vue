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
        <FlightItem v-for="flight in flights" :key="flight.id" :flight="flight" :airports="airports" />
      </v-list>
      <v-alert v-else type="info">
        No flights available. Add a flight to see it here!
      </v-alert>
    </v-responsive>

    <Form :dialog="isFormOpen" @close="closeForm" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Form from './Form.vue';
import FlightItem from './FlightItem.vue';
import { getFlights } from '@/api/flight.js';
import { getAirports } from '@/api/airports.js';

const isFormOpen = ref(false);
const flights = ref([]);
const airports = ref([]);

const openForm = () => {
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const fetchFlights = async () => {
  try {
    const response = await getFlights();
    flights.value = response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
  }
};

const fetchAirports = async () => {
  try {
    const response = await getAirports();
    airports.value = response.data;
  } catch (error) {
    console.error('Error fetching airports:', error);
  }
};

onMounted(() => {
  fetchFlights();
  fetchAirports();
});
</script>