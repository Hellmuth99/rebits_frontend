<template>
  <!-- component -->
  <!-- <body class="antialiased font-sans bg-gray-200"> -->
  <div class="min-h-screen bg-gray-200">
    <div class="container mx-auto px-4 sm:px-8 py-8 mt-20">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4 bg-gray-100 flex justify-between items-center">
          <h2 class="text-2xl font-semibold">Listado Vehículos</h2>
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
            <span>Crear Vehículo</span>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Marca
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Modelo
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Patente
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Año
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Precio
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(vehicle, index) in vehicles"
                :key="vehicle.id"
                :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
              >
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ vehicle.marca }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ vehicle.modelo }}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ vehicle.patente }}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ vehicle.anio }}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">{{ vehicle.precio }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap">
                  <button
                    @click="openModal(vehicle)"
                    class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-red-800 focus:outline-none"
                  >
                    Editar
                  </button>
                  <button
                    @click="confirmarEliminacion(vehicle.patente)"
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

        <!-- Componente del modal de edición -->
        <!-- Modal -->
        <!-- Modal -->
        <!-- <VehicleEditModal v-if="showModal" :vehicle="vehicleToEdit" @close="cerrarModal" /> -->
        <!-- <transition name="modal"> -->
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
                {{ editMode ? 'Editar Vehículo' : 'Crear Vehículo' }}
              </h3>
            </div>

            <!-- Contenido del modal -->
            <div class="p-6">
              <form @submit="onSubmit">
                <div class="mb-4">
                  <label for="nombre" class="block text-sm font-medium text-gray-700">Marca:</label>
                  <CustomInput v-model="marca" v-bind="marcaAttrs" :error="errors.marca" />
                </div>
                <div class="mb-4">
                  <label for="apellidos" class="block text-sm font-medium text-gray-700"
                    >Modelo:</label
                  >
                  <CustomInput v-model="modelo" v-bind="modeloAttrs" :error="errors.modelo" />
                </div>
                <div class="mb-4">
                  <label for="correo" class="block text-sm font-medium text-gray-700"
                    >Patente:</label
                  >
                  <CustomInput
                    v-model="patente"
                    v-bind="patenteAttrs"
                    :error="errors.patente"
                    :disabled="editMode"
                  />
                </div>

                <div class="mb-4">
                  <label for="correo" class="block text-sm font-medium text-gray-700">Año:</label>
                  <CustomInput v-model="anio" v-bind="anioAttrs" :error="errors.anio" />
                </div>

                <div class="mb-4">
                  <label for="correo" class="block text-sm font-medium text-gray-700"
                    >Precio:</label
                  >
                  <CustomInput v-model="precio" v-bind="precioAttrs" :error="errors.precio" />
                </div>

                <div class="mb-4">
                  <label for="modelo" class="block text-sm font-medium text-gray-700">Dueño:</label>
                  <CustomInput
                    v-model="ownerName"
                    v-bind="usuarioNombreAttrs"
                    :error="errors.usuarioNombre"
                    v-bind:disabled="true"
                  />
                </div>

                <div class="mb-4">
                  <label for="usuario" class="form-label">{{
                    editMode ? 'Cambiar Usuario:' : 'Asignar Dueño:'
                  }}</label>
                  <select v-model="usuario" v-bind="usuarioAttrs" class="form-control">
                    <option value="">Seleccione</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.nombre }} {{ user.apellidos }}
                    </option>
                  </select>
                  <span class="text-red-400" v-show="errors.user">{{ errors.user }}</span>
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
          </div>
        </div>
        <!-- </transition> -->
        <!-- Modal --><!-- Modal --><!-- Modal --><!-- Modal --><!-- Modal -->
      </div>
    </div>
  </div>
  <!-- </body> -->
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsAction } from '@/modules/products/actions';
import { getVehicleById, getVehicles, updateVehicleFull } from '../actions';
import VehicleEditModal from '../views/VehicleEditModal.vue';
import { deleteVehicleById } from '../actions/delete-vehicle';
import { useToast } from 'vue-toastification';
import { getUsersList } from '@/modules/users/actions/get-users-list';
import { useForm } from 'vee-validate';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import * as yup from 'yup';
import { createUser } from '@/modules/users/actions/create-user';
import { createVehicle } from '../actions/create-vehicle';

const queryClient = useQueryClient();
const { page } = usePagination();
const vehicleToEdit = ref(null);
const showModal = ref(false);
const toast = useToast();
const selectedVehicle = ref(null);
const editMode = ref(false);

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

const validationSchema = yup.object().shape({
  //   id: yup.string().required('El ID es requerido'),
  anio: yup
    .number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required('El año es requerido'),
  //   dueno_id: yup.string().required('El ID del dueño es requerido'),
  marca: yup.string().required('La marca es requerida'),
  modelo: yup.string().required('El modelo es requerido'),
  patente: yup.string().required('La patente es requerida'),
  precio: yup.number().positive('El precio debe ser positivo').required('El precio es requerido'),
});

const { data: users = [] } = useQuery({
  queryKey: ['users'],
  queryFn: () => getUsersList(), // Llama a tu función getUserList con el número de página actual
});

// const {
//   mutate,
//   isPending,
//   isSuccess: isUpdateSuccess,
//   data: updatedProduct,
// } = useMutation({
//   // mutationFn: createUpdateProductAction,
// });

const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
  validationSchema,
  //   initialValues: vehicle.value,
});

const ownerName = computed(() => {
  const owner = users.value?.find((user) => user.id === selectedVehicle.value?.dueno_id);
  return owner ? `${owner.nombre} ${owner.apellidos}` : 'Desconocido';
});

const [marca, marcaAttrs] = defineField('marca');
const [modelo, modeloAttrs] = defineField('modelo');
const [patente, patenteAttrs] = defineField('patente');
const [anio, anioAttrs] = defineField('anio');
const [precio, precioAttrs] = defineField('precio');

const [usuario, usuarioAttrs] = defineField('user');

const [usuarioNombre, usuarioNombreAttrs] = defineField('userName');

console.log('usuarioNombre', usuarioNombre);

// const ownerName = computed(() => {
//   const owner = users.value?.find((user) => user.id === vehicle.value?.dueno_id);
//   return owner ? `${owner.nombre} ${owner.apellidos}` : 'Desconocido';
// });

// watch(
//   vehicle,
//   () => {
//     console.log('####', vehicle);
//     if (!vehicle) return;

//     resetForm({
//       values: vehicle.value,
//     });
//   },
//   {
//     deep: true,
//     immediate: true,
//   },
// );

const verDetalle = (vehicleId: number) => {
  // Lógica para ver detalle del vehículo
  console.log(`Ver detalle del vehículo con ID ${vehicleId}`);
};

const editar = (vehicleId: number) => {
  // Lógica para editar el vehículo
  console.log(`Editar vehículo con ID ${vehicleId}`);
};

const confirmarEliminacion = async (id) => {
  console.log('id', id);
  if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
    try {
      await deleteVehicleById(id);
      toast.success('Acción realizada con éxito');
      refetch();
      // Aquí puedes añadir la lógica para actualizar la lista de vehículos después de la eliminación
    } catch (error) {
      toast.error('Error al realizar la acción');
    }
  }
};

const closeModal = () => {
  resetForm();
  showModal.value = false;
  //   editMode.value = false;
};

const openModal = (vehicle = null) => {
  console.log('vehicle----openModal-aa', vehicle);
  if (vehicle) {
    editMode.value = true;
    selectedVehicle.value = vehicle;
    resetForm({
      values: {
        id: vehicle.id,
        anio: vehicle.anio,
        dueno_id: vehicle.dueno_id, // Asegúrate de que `vehicle.user` es correcto
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        patente: vehicle.patente,
        precio: vehicle.precio,
      },
    });
  } else {
    editMode.value = false;
    selectedVehicle.value = null;
    resetForm({
      values: {
        id: '',
        anio: '',
        dueno_id: '',
        marca: '',
        modelo: '',
        patente: '',
        precio: '',
      },
    });
  }
  showModal.value = true;
};

const abrirModalEditar = (vehicle) => {
  console.log('Abriendo modal para editar vehículo:', vehicle);
  vehicleToEdit.value = { ...vehicle }; // Clonamos el objeto para evitar mutaciones inesperadas

  showModal.value = true;
};

console.log('vehicleToEdit', vehicleToEdit.value);

const cerrarModalEditar = () => {
  vehicleToEdit.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  console.log('aaaaaaaaaaaaaaaaaaaaa.-.-.-.-', values);
  try {
    if (editMode.value && selectedVehicle.value) {
      console.log('vvalues', values);

      let form = {
        id: values.id,
        anio: values.anio,
        dueno_id: values.user ? values.user : values.dueno_id, // Asegúrate de que `values.user` es correcto
        marca: values.marca,
        modelo: values.modelo,
        patente: values.patente,
        precio: values.precio,
      };
      await updateVehicleFull(form);
      refetch();
      toast.success('Usuario actualizado exitosamente');
    } else {
      await createVehicle(values);
      refetch();
      toast.success('Usuario creado exitosamente');
    }
    closeModal();
    // refetchUser();
  } catch (error) {
    console.error('Error al crear/editar usuario:', error.message);
    toast.error(error.message || 'Hubo un error. Por favor, intenta nuevamente.');
  }
});
</script>

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
