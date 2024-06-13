<template>
  <!-- Otro contenido de tu componente -->

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <!-- Contenido del modal -->
      <!-- <h2 class="text-2xl font-bold mb-4">Detalles del Vehículo</h2>
      <p>{{ modalVehicle?.marca }} {{ modalVehicle?.modelo }}</p>
      <p>Patente: {{ modalVehicle?.patente }}</p>
      <p>Año: {{ modalVehicle?.anio }}</p>
      <p>Dueño: {{ modalVehicle?.nombre }} {{ modalVehicle?.apellidos }}</p> -->

      <!-- Botón para cerrar el modal -->
      <button
        @click="closeModal"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Cerrar
      </button>
    </div>
  </div>

  <!-- Otro contenido de tu componente -->
</template>

<!-- <script src="../views/MantenedorView.ts" lang="ts"></script> -->
