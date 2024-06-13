<template>
  <transition name="modal">
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 class="text-xl font-semibold mb-4">Editar Vehículo</h2>
        <form @submit="onSubmit">
          <div class="mb-4">
            <label for="marca" class="block text-sm font-medium text-gray-700">Marca:</label>

            <CustomInput v-model="marca" v-bind="marcaAttrs" :error="errors.marca" />
          </div>
          <div class="mb-4">
            <label for="modelo" class="block text-sm font-medium text-gray-700">Modelo:</label>
            <CustomInput v-model="modelo" v-bind="modeloAttrs" :error="errors.modelo" />
          </div>

          <div class="mb-4">
            <label for="patente" class="block text-sm font-medium text-gray-700">Patente:</label>
            <CustomInput v-model="patente" v-bind="patenteAttrs" :error="errors.patente" />
          </div>

          <div class="mb-4">
            <label for="modelo" class="block text-sm font-medium text-gray-700">Año:</label>
            <CustomInput v-model="anio" v-bind="anioAttrs" :error="errors.anio" />
          </div>

          <div class="mb-4">
            <label for="modelo" class="block text-sm font-medium text-gray-700">Precio:</label>
            <CustomInput v-model="precio" v-bind="precioAttrs" :error="errors.precio" />
          </div>

          <p>Dueño Actual: {{ ownerName }}</p>

          <!-- <div class="mb-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Usuario:</label>
            <CustomInput v-model="nombre" v-bind="nombreAttrs" :error="errors['user.nombre']" />
          </div> -->

          <div class="mb-4">
            <label for="usuario" class="form-label">Cambiar Usuario:</label>
            <select v-model="usuario" v-bind="usuarioAttrs" class="form-control">
              <option value="">Seleccione</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.nombre }} {{ user.apellidos }}
              </option>
            </select>
            <span class="text-red-400" v-show="errors.user">{{ errors.user }}</span>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isPending"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ isPending ? 'Guardando...' : 'Guardar cambios' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Cancelar
            </button>
          </div>

          <div class="grid grid-cols-2 mt-2">
            <pre class="bg-blue-200 p-2">
      {{ JSON.stringify(values, null, 2) }}
    </pre
            >
            <pre class="bg-red-200 p-2">
      {{ JSON.stringify(errors, null, 2) }}
    </pre
            >
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script src="./VehicleView.ts" lang="ts"></script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
