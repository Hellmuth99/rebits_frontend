<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all sm:max-w-lg w-full"
  >
    <!-- Encabezado del modal -->
    <div class="bg-indigo-600 px-6 py-4">
      <h3 class="text-lg font-semibold text-white">Cargar Archivo Excel</h3>
    </div>

    <!-- Contenido del modal -->
    <div class="p-6">
      <!-- Selector para nuevo dueño -->
      <div class="mb-4">
        <input
          type="file"
          @change="handleFileUpload"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          accept=".xlsx, .xls"
        />
      </div>

      <!-- Botones de guardar y cancelar -->
      <div class="flex justify-end">
        <button
          @click="sendToBackend"
          :disabled="!selectedFile || isLoading"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Subir Archivo
        </button>
      </div>
    </div>
  </div>
  <loading-overlay :active.sync="isLoading" :is-full-page="false">
    <div class="flex items-center justify-center h-full">
      <div
        class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      ></div>
    </div>
  </loading-overlay>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import LoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { mantenedorApi } from '@/api/mantenedorApi';

export default {
  name: 'ButtonChangeFile',
  components: {
    LoadingOverlay,
  },
  props: {
    refetch: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const selectedFile = ref(null);
    const toast = useToast();
    const isLoading = ref(false);

    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const sendToBackend = async () => {
      if (!selectedFile.value) return;

      const formData = new FormData();
      formData.append('excel_prueba', selectedFile.value);

      isLoading.value = true;
      try {
        const response = await mantenedorApi.post('/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully:', response.data);
        toast.success('Archivo subido exitosamente');
        selectedFile.value = null;
        props.refetch();
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error al subir el archivo');
        selectedFile.value = null;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      selectedFile,
      handleFileUpload,
      sendToBackend,
      isLoading,
    };
  },
};
</script>
<style scoped>
.spinner-border {
  border-top-color: #3498db;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: #3498db;
}
</style>
