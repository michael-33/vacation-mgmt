<template>
  <n-data-table
    :columns="columns"
    :data="items"
    :bordered="false"
    size="small"
  />
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { NDataTable, NButton, useDialog, useMessage } from "naive-ui";
import StatusBadge from "@/components/common/status-badge.vue";
import { RequestStatus } from "common";

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

const props = withDefaults(defineProps<{ items?: Item[] }>(), {
  items: () => [],
});
const emit = defineEmits<{
  (e: "approve", id: number): void;
  (e: "reject", id: number, comment?: string): void;
}>();

const dialog = useDialog();
const message = useMessage();

function approve(row: Item) {
  emit("approve", row.id);
}

function reject(row: Item) {
  let inputVal = "";
  dialog.success({
    title: "reject request",
    content: () =>
      h("div", [
        h("div", { style: "margin-bottom:8px" }, "optional comment"),
        h("input", {
          style:
            "width:100%;padding:6px;border:1px solid #ccc;border-radius:6px;",
          onInput: (e: any) => (inputVal = e.target.value),
        }),
      ]),
    positiveText: "reject",
    negativeText: "cancel",
    onPositiveClick: () => emit("reject", row.id, inputVal),
  });
}

const columns = ref([
  { title: "user id", key: "user_id" },
  { title: "start", key: "start_date" },
  { title: "end", key: "end_date" },
  { title: "reason", key: "reason" },
  {
    title: "status",
    key: "status",
    render: (row: Item) => h(StatusBadge, { status: row.status as any }),
  },
  { title: "comments", key: "comments" },
  {
    title: "actions",
    key: "actions",
    render: (row: Item) => {
      if ((row.status as any) !== (RequestStatus as any).PENDING) {
        return h("div");
      }
      return h("div", { style: "display:flex;gap:8px;" }, [
        h(
          NButton,
          { size: "small", type: "primary", onClick: () => approve(row) },
          { default: () => "approve" },
        ),
        h(
          NButton,
          { size: "small", type: "error", onClick: () => reject(row) },
          { default: () => "reject" },
        ),
      ]);
    },
  },
]);
</script>
