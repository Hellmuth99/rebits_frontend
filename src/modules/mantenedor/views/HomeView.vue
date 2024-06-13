<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <!-- <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1> -->
  </div>

  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <ButtonChangeFile :refetch="refetch" />
  </div>

  <div class="pt-5 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">Mantenedor Vehiculo Asociados</h1>
  </div>
  <div v-if="!vehicles" class="text-center h-[500px]">
    <h1 class="text-xl">Cargando...</h1>
    <p>Espere por favor</p>
  </div>

  <!-- <VehiclesList v-else :vehicles="vehicles" :refetch="refetch" /> -->
  <VehicleCard v-else :vehicles="vehicles" :refetch="refetch" />

  <ButtonPagination :page="page" :has-more-data="!!vehicles && vehicles.length < 10" />

  <!-- <div>loading: {{ isLoading }}</div>

  <div>{{ vehicles?.data }}</div> -->
</template>

<script lang="ts" setup>
import { getVehicles } from '@/modules/vehicles/actions';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/vue-query';
import VehiclesList from '@/modules/vehicles/components/VehiclesList.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import ButtonChangeFile from '@/modules/common/components/ButtonChangeFile.vue';
import { usePagination } from '@/modules/common/composables/usePagination';

import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import VehicleCard from '@/modules/vehicles/components/VehicleCard.vue';

// import { getVehicles } from '../actions/get-vehicles';

const { page } = usePagination();
const queryClient = useQueryClient();

console.log('page', page);

const { data: vehicles = [], refetch } = useQuery({
  queryKey: ['vehicles', { page: page }],
  queryFn: () => getVehicles(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['vehicles', { page: page.value + 1 }],
    queryFn: () => getVehicles(page.value + 1),
  });
});
</script>
