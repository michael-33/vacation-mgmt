<template>
  <AppProviders>
    <NavBar />
    <router-view />
  </AppProviders>
</template>

<script setup lang="ts">
import AppProviders from "@/components/app-providers.vue";
import NavBar from "@/components/layout/nav-bar.vue";
</script>

<style>
/* minimal global styles */
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
}
</style>
