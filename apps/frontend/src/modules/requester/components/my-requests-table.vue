<template>
  <n-data-table
    :columns="columns"
    :data="items"
    :bordered="false"
    size="small"
    :max-height="230"
  />
</template>

<script setup lang="ts">
import { h } from "vue";
import { NDataTable } from "naive-ui";
import StatusBadge from "@/components/common/status-badge.vue";
import { RequestStatus } from "common";

interface Item {
  id: number;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: RequestStatus;
  comments: string | null;
  created_at: string;
}

withDefaults(defineProps<{ items?: Item[] }>(), { items: () => [] });

const columns = [
  { title: "start", key: "start_date" },
  { title: "end", key: "end_date" },
  { title: "reason", key: "reason", ellipsis: { tooltip: true } },
  {
    title: "status",
    key: "status",
    render: (row: Item) => h(StatusBadge, { status: row.status }),
  },
  { title: "comments", key: "comments", ellipsis: { tooltip: true } },
];
</script>
