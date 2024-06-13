<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      <h1 class="text-3xl text-center font-bold py-4 bg-gray-800 text-white">Productos</h1>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Marca</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Modelo</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Patente</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Año</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(vehicle, index) in vehicles"
              :key="vehicle.id"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="py-3 px-4">{{ vehicle.marca }}</td>
              <td class="py-3 px-4">{{ vehicle.modelo }}</td>
              <td class="py-3 px-4">{{ vehicle.patente }}</td>
              <td class="py-3 px-4">{{ vehicle.anio }}</td>
              <td class="py-3 px-4">{{ vehicle.precio }}</td>
              <td class="py-3 px-4 flex gap-2 justify-center">
                <button
                  @click="abrirModalEditar(vehicle)"
                  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  @click="confirmarEliminacion(vehicle.patente)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ButtonPagination :page="page" :has-more-data="!!vehicles && vehicles.length < 10" />

      <!-- Componente del modal de edición -->
      <VehicleEditModal v-if="showModal" :vehicle="vehicleToEdit" @close="cerrarModal" />
    </div>
  </div>
</template>
