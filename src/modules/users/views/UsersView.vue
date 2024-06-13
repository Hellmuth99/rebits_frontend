<template>
  <!-- component -->
  <!-- <body class="antialiased font-sans bg-gray-200"> -->
  <div class="min-h-screen bg-gray-200">
    <div class="container mx-auto px-4 sm:px-8 py-8 mt-20">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4 bg-gray-100 flex justify-between items-center">
          <h2 class="text-2xl font-semibold">Listado Usuarios</h2>
          <button
            @click="openModal()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none shadow-sm"
          >
            <svg
              class="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-7a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Crear Usuario</span>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Correo
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Created at
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in users"
                :key="user.id"
                :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
              >
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-full h-full rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjL8jIufg0ynUWHbl9He5i9Y84FpAs5avD1toXiAZW3B-b1MSLLdI7eQt5TVmmgqmQlTw&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.nombre }} {{ user.apellidos }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ user.correo }}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ formatDate(user.created_at) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <button
                    @click="openModal(user)"
                    class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-red-800 focus:outline-none"
                  >
                    Editar
                  </button>
                  <button
                    @click="confirmarEliminacion(user.id)"
                    class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-800 focus:outline-none"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ButtonPagination :page="page" :has-more-data="!!users && users.length < 10" />
      </div>
    </div>
  </div>
  <!-- </body> -->

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
        <h3 class="text-lg font-semibold text-white">
          {{ editMode ? 'Editar Usuario' : 'Crear Usuario' }}
        </h3>
      </div>

      <!-- Contenido del modal -->
      <div class="p-6">
        <form @submit="onSubmit">
          <div class="mb-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
            <CustomInput v-model="nombre" v-bind="nombreAttrs" :error="errors.nombre" />
          </div>
          <div class="mb-4">
            <label for="apellidos" class="block text-sm font-medium text-gray-700"
              >Apellidos:</label
            >
            <CustomInput v-model="apellidos" v-bind="apellidosAttrs" :error="errors.apellidos" />
          </div>
          <div class="mb-4">
            <label for="correo" class="block text-sm font-medium text-gray-700">Correo:</label>
            <CustomInput v-model="correo" v-bind="correoAttrs" :error="errors.correo" />
          </div>

          <!-- Botones de guardar y cancelar -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar
            </button>
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import { getUsers } from '../actions/get-users';
import { formatDate } from '@/utils/formatDate';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { useToast } from 'vue-toastification';
import { deleteUser } from '../actions/delete-user';
import { createUser } from '../actions/create-user';
import { updateUser } from '../actions/update-user';

const queryClient = useQueryClient();
const { page } = usePagination();
const showModal = ref(false);
const editMode = ref(false);
const selectedUser = ref(null);
const toast = useToast();

const { data: users = [], refetch: refetchUser } = useQuery({
  queryKey: ['users', { page: page }],
  queryFn: () => getUsers(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['users', { page: page.value + 1 }],
    queryFn: () => getUsers(page.value + 1),
  });
});

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres'),
  apellidos: yup
    .string()
    .required('Los apellidos son obligatorios')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no deben exceder los 50 caracteres'),
  correo: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('El correo electrónico no es válido')
    .max(100, 'El correo electrónico no debe exceder los 100 caracteres'),
});

const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
  validationSchema,
});

const [nombre, nombreAttrs] = defineField('nombre');
const [apellidos, apellidosAttrs] = defineField('apellidos');
const [correo, correoAttrs] = defineField('correo');

const openModal = (user = null) => {
  if (user) {
    editMode.value = true;
    selectedUser.value = user;
    resetForm({
      values: {
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
      },
    });
  } else {
    editMode.value = false;
    selectedUser.value = null;
    resetForm({
      values: {
        id: '',
        nombre: '',
        apellidos: '',
        correo: '',
      },
    });
  }
  showModal.value = true;
};

const closeModal = () => {
  resetForm();
  showModal.value = false;
  editMode.value = false;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    if (editMode.value && selectedUser.value) {
      console.log('vvalues', values);
      await updateUser(values);
      toast.success('Usuario actualizado exitosamente');
    } else {
      await createUser(values);
      toast.success('Usuario creado exitosamente');
    }
    closeModal();
    refetchUser();
  } catch (error) {
    console.error('Error al crear/editar usuario:', error.message);
    toast.error(error.message || 'Hubo un error. Por favor, intenta nuevamente.');
  }
});

const confirmarEliminacion = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await deleteUser(id);
      toast.success('Usuario eliminado exitosamente');
      refetchUser();
    } catch (error) {
      toast.error('Error al eliminar usuario');
    }
  }
};
</script>
