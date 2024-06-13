import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';

// import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';

import CustomInput from '@/modules/common/components/CustomInput.vue';
// import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

import { useForm } from 'vee-validate';
import { getUsersList } from '@/modules/users/actions/get-users-list';
import { getVehicleById } from '@/modules/vehicles/actions';

import { getVehicles } from '@/modules/vehicles/actions';
import VehiclesList from '@/modules/vehicles/components/VehiclesList.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import ButtonChangeFile from '@/modules/common/components/ButtonChangeFile.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import ModalMantenedor from '@/modules/mantenedor/components/ModalMantenedor.vue';

const validationSchema = yup.object({
  marca: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
  modelo: yup.string().required(),
});

export default defineComponent({
  components: {
    CustomInput,
    ButtonChangeFile,
    ButtonPagination,
    ModalMantenedor,

    // CustomTextArea,
  },

  setup() {
    const router = useRouter();
    const toast = useToast();

    // const {
    //   data: vehicle,
    //   isError,
    //   isLoading,
    //   refetch,
    // } = useQuery({
    //   queryKey: ['vehicle', props.vehicle.id],
    //   queryFn: () => getVehicleById(props.vehicle.id),
    //   retry: false,
    // });

    const { data: users = [] } = useQuery({
      queryKey: ['users'],
      queryFn: () => getUsersList(), // Llama a tu función getUserList con el número de página actual
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      // mutationFn: createUpdateProductAction,
    });

    const { page } = usePagination();
    const queryClient = useQueryClient();

    const { data: vehicles = [], refetch: refetchVehicles } = useQuery({
      queryKey: ['vehicles', { page: page }],
      queryFn: () => getVehicles(page.value),
    });

    watchEffect(() => {
      queryClient.prefetchQuery({
        queryKey: ['vehicles', { page: page.value + 1 }],
        queryFn: () => getVehicles(page.value + 1),
      });
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      // validationSchema,
      // initialValues: vehicle.value,
    });

    const [marca, marcaAttrs] = defineField('marca');
    const [modelo, modeloAttrs] = defineField('modelo');
    const [patente, patenteAttrs] = defineField('patente');
    const [anio, anioAttrs] = defineField('anio');
    const [precio, precioAttrs] = defineField('precio');

    const [usuario, usuarioAttrs] = defineField('user');

    const onSubmit = handleSubmit(async (values) => {
      console.log('first-values', values);
      // const product = await createUpdateProductAction(value);
      // console.log({ product });
      // mutate(values);
    });

    // watchEffect(() => {
    //   if (isError.value && !isLoading.value) {
    //     router.replace('/');
    //     return;
    //   }
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

    // watch(isUpdateSuccess, (value) => {
    //   if (!value) return;

    //   toast.success('Producto actualizado correctamente');
    //   router.replace(`/admin/products/${updatedProduct.value!.id}`);

    //   useResetForm({
    //     values: updatedProduct.value,
    //   });

    // });

    // watch(
    //   () => props.productId,
    //   () => {
    //     refetch();
    //   },
    // );

    //  const  handleSelectChange ()=> {
    //     // Encontrar el producto seleccionado basado en el ID
    //     usuario = this.products.find(product => product.id === this.selectedProductId);
    //   }

    // const ownerName = computed(() => {
    //   const owner = users.value?.find((user) => user.id === vehicle.value?.dueno_id);
    //   return owner ? `${owner.nombre} ${owner.apellidos}` : 'Desconocido';
    // });

    const showModal = ref(false);
    const modalVehicle = ref(null); // Variable para almacenar los detalles del vehículo a mostrar en el modal

    const abrirModalEditar = (vehicle) => {
      // Asigna los detalles del vehículo al modalVehicle para mostrar en el modal
      modalVehicle.value = vehicle;
      showModal.value = true; // Abre el modal
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      // Properties
      values,
      errors,

      marca,
      marcaAttrs,
      modelo,
      modeloAttrs,
      precio,
      precioAttrs,
      anio,
      anioAttrs,
      patente,
      patenteAttrs,
      usuario,
      usuarioAttrs,
      // nombre,
      // nombreAttrs,
      // meta,
      // Actions
      onSubmit,

      isPending,
      users,

      refetchVehicles,
      abrirModalEditar,

      vehicles,
      page,

      showModal,

      closeModal,
      // ButtonChangeFile,
    };
  },
});
