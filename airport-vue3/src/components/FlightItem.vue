<template>
    <v-list-item class="flight-item">
      <v-list-item-content>
        <v-list-item-title class="flight-title">
          Flight ID: {{ flight.id }}
        </v-list-item-title>
        <v-list-item-subtitle class="flight-subtitle">
          {{ getAirportName(flight.id_airport_departure) }} → {{ getAirportName(flight.id_airport_arrival) }} | Departure: {{ formattedDepartureTime }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </template>
  
  <script>
  import { format } from 'date-fns';
  
  export default {
    name: 'FlightItem',
    props: {
      flight: {
        type: Object,
        required: true
      },
      airports: {
        type: Array,
        required: true
      }
    },
    computed: {
      formattedDepartureTime() {
        return format(new Date(this.flight.departure_time), 'PPpp');
      }
    },
    methods: {
      getAirportName(id) {
        if (Array.isArray(this.airports) && this.airports.length > 0) {
          const airport = this.airports.find(airport => airport.id === id);
          return airport ? airport.name : 'Unknown Airport';
        }
        return 'Unknown Airport';
      }
    }
  };
  </script>
  
  <style scoped>
  .flight-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .flight-title {
    font-weight: bold;
    color: #333;
  }
  
  .flight-subtitle {
    color: #666;
  }
  </style>