<template>
  <section style="padding: 16px; display: grid; gap: 16px">
    <n-card>
      <div style="display: flex; gap: 12px; align-items: center">
        <StatusFilter v-model:status="status" />
        <n-button @click="load">reload</n-button>
      </div>
    </n-card>

    <n-card title="all requests">
      <RequestsTable :items="filtered" @approve="approve" @reject="reject" />
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { NCard, NButton, useMessage } from "naive-ui";
import StatusFilter from "../components/status-filter.vue";
import RequestsTable from "../components/requests-table.vue";
import api from "@/services/api";
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
const status = ref<RequestStatus | "ALL">("ALL");
const message = useMessage();

async function load() {
  const res = await api.get("/requests"); // backend guards validator role
  items.value = res.data.items;
}
const filtered = computed(() =>
  status.value === "ALL"
    ? items.value
    : items.value.filter((i) => i.status === status.value),
);

async function approve(id: number) {
  await api.post(`/requests/${id}/approve`);
  message.success("approved");
  await load();
}
async function reject(id: number, comment?: string) {
  await api.post(`/requests/${id}/reject`, { comment: comment || null });
  message.success("rejected");
  await load();
}

onMounted(load);
</script>
