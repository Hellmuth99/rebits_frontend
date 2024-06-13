<template>
  <section class="py-10 bg-gray-100">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <!-- Vehiculos Card -->
      <article
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        <div class="mt-2 p-4">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ vehicle.marca }} {{ vehicle.modelo }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">Patente: {{ vehicle.patente }}</p>
          <p class="mt-1 text-sm text-gray-600">Año: {{ vehicle.anio }}</p>
          <p class="mt-1 text-sm text-gray-600">
            Dueño: {{ vehicle.nombre }} {{ vehicle.apellidos }}
          </p>

          <div class="mt-4 flex items-center justify-between">
            <p class="text-lg font-bold text-indigo-600">{{ formatCurrency(vehicle.precio) }}</p>
          </div>

          <!-- Botón para abrir el modal -->
          <div class="mt-4">
            <button
              class="block w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              @click="openModal(vehicle)"
            >
              Modificar Dueño
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- Modal -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    v-if="showModal"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all sm:max-w-lg w-full"
    >
      <!-- Encabezado del modal -->
      <div class="bg-blue-500 px-6 py-4">
        <h3 class="text-lg font-semibold text-white">Modificar Dueño</h3>
      </div>

      <!-- Contenido del modal -->
      <div class="p-6">
        <!-- Mostrar dueño actual -->
        <p class="mb-4">
          <strong>Dueño Actual:</strong> {{ selectedVehicle?.nombre }}
          {{ selectedVehicle?.apellidos }}
        </p>

        <!-- Selector para nuevo dueño -->
        <div class="mb-4">
          <label for="nuevoDueno" class="block text-sm font-medium text-gray-700"
            >Seleccionar Nuevo Dueño:</label
          >
          <select
            v-model="nuevoDueno"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.nombre }} {{ user.apellidos }}
            </option>
          </select>
        </div>

        <!-- Botones de guardar y cancelar -->
        <div class="flex justify-end">
          <button
            @click="guardarCambios"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar
          </button>
          <button
            @click="cancelarCambios"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { getUsersList } from '@/modules/users/actions/get-users-list';
import { useQuery } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { updateDueno } from '@/modules/mantenedor/actions/update-dueno';
import { formatCurrency } from '@/utils/formatDate';
import type { Vehicle } from '../interfaces/vehicle.interface';

const props = defineProps<{
  vehicles: Vehicle[];
  refetch: () => void;
}>();

const showModal = ref(false);
const selectedVehicle = ref<Vehicle | null>(null);
const nuevoDueno = ref('');
const toast = useToast();

const openModal = (vehicle: Vehicle) => {
  selectedVehicle.value = vehicle;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedVehicle.value = null;
  nuevoDueno.value = '';
};

const guardarCambios = async () => {
  if (nuevoDueno.value !== '') {
    if (!selectedVehicle.value) {
      toast.error('No se encontró el vehículo seleccionado');
      return;
    }

    const form = {
      ...selectedVehicle.value,
      dueno_id: nuevoDueno.value,
    };

    if (confirm('¿Estás seguro de que desea editar?')) {
      try {
        await updateDueno(form);

        // Encuentra el índice del vehículo actualizado y actualiza la lista
        const index = props.vehicles.findIndex((v) => v.id === selectedVehicle.value.id);
        if (index !== -1) {
          props.vehicles[index] = { ...props.vehicles[index], dueno_id: nuevoDueno.value };
        }

        toast.success('Acción realizada exitosamente');
        closeModal();
        props.refetch();
      } catch (error) {
        console.error(error);
        toast.error('Error al realizar la acción');
      }
    }
  } else {
    alert('Por favor selecciona un nuevo dueño');
  }
};

const cancelarCambios = () => {
  closeModal();
};

const { data: users = [] } = useQuery({
  queryKey: ['users'],
  queryFn: getUsersList,
});
</script>

<style scoped>
article {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

article:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
