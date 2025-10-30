<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/layout/nav-bar.vue";
</script>

<style>
/* minimal global styles */
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
}
</style>
