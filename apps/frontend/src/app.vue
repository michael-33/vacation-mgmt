<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <NavBar />
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NDialogProvider } from "naive-ui";
import NavBar from "@/components/layout/nav-bar.vue";
</script>

<style>
/* minimal global styles */
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
}
</style>
