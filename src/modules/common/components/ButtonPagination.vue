<template>
  <div
    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
  >
    <!-- <span class="text-xs xs:text-sm text-gray-900"> Showing 1 to 4 of 50 Entries </span> -->
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        :disabled="page === 1"
        @click="$router.push({ query: { page: page - 1 } })"
        class="flex items-center text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:bg-gray-300"
      >
        <ArrowLeftIcon />
        <span>Anterior</span>
      </button>
      <!-- <button
                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              >
              Anterior
              </button> -->
      <button
        :disabled="hasMoreData"
        @click="$router.push({ query: { page: page + 1 } })"
        class="flex items-center text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r disabled:bg-gray-300"
      >
        <span>Siguiente</span>
        <ArrowRightIcon />
      </button>
      <!-- <button
        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
      >
        Siguiente
      </button> -->
    </div>
  </div>

  <!-- <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <ArrowLeftIcon />
      <span>Anterior</span>
    </button>

    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <span>Siguiente</span>
      <ArrowRightIcon />
    </button>
  </div> -->
</template>

<script lang="ts" setup>
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

interface Props {
  page: number;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
