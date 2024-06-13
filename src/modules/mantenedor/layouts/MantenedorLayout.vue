<template>
  <!-- component -->
  <!-- Create By Joker Banny -->

  <!-- Header Navbar -->
  <!-- <TopMenu /> -->
  <top-menu />

  <!-- RouterView -->
  <router-view />

  <!-- Footer -->
  <custom-footer />
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
// import CustomFooter from '../views/CustomFooter.vue';
</script>
