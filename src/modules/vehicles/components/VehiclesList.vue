<template>
  <!-- Vehiculos Listado -->
  <section class="py-10 bg-gray-100">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <!-- Vehiculos Card -->
      <VehicleCard v-for="vehicle in vehicles" :key="vehicle?.id" :vehicle="vehicle" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Vehicle } from '../interfaces/vehicle.interface';
import VehicleCard from './VehicleCard.vue';

interface Props {
  vehicles: Vehicle[];
  refetchVehicles: () => Promise<void>;
}

defineProps<Props>();
</script>
