<template>
  <section style="padding: 16px; display: grid; gap: 16px">
    <n-card title="new vacation request">
      <RequestForm :existing="items" @submitted="reload" />
    </n-card>

    <n-card title="my requests">
      <MyRequestsTable :items="items" />
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { NCard } from "naive-ui";
import RequestForm from "../components/request-form.vue";
import MyRequestsTable from "../components/my-requests-table.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user.store";
import { RequestStatus } from "common";

interface Item {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: RequestStatus;
  comments: string | null;
  created_at: string;
}

const items = ref<Item[]>([]);
const isLoading = ref(false);
const store = useUserStore();

async function load() {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const res = await api.get("/requests/me");
    items.value = res.data.items;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
function reload() {
  load();
}

onMounted(load);

watch(
  () => store.selectedUserId,
  () => {
    load();
  }
);
</script>
