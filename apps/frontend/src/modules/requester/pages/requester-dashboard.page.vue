<template>
  <section style="padding: 16px; display: grid; gap: 16px">
    <n-card title="new vacation request">
      <RequestForm @submitted="reload" />
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

interface Item {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: string;
  comments: string | null;
  created_at: string;
}

const items = ref<Item[]>([]);
const store = useUserStore(); 

async function load() {
  try {
    const res = await api.get("/requests/me");
    items.value = res.data.items;
  } catch (e) {
    console.error(e);
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
  },
);
</script>
