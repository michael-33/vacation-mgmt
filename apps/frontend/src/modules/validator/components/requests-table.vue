<template>
  <n-data-table
    :columns="columns"
    :data="items"
    :bordered="false"
    size="small"
    :max-height="420"
  />
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { NDataTable, NButton, useDialog, useMessage } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import StatusBadge from "@/components/common/status-badge.vue";
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

const columns = ref<DataTableColumns<Item>>([
  { title: "user id", key: "user_id" },
  { title: "start", key: "start_date" },
  { title: "end", key: "end_date" },
  { title: "reason", key: "reason", ellipsis: { tooltip: true } },
  {
    title: "status",
    key: "status",
    render: (row: Item) => h(StatusBadge, { status: row.status as any }),
  },
  { title: "comments", key: "comments", ellipsis: { tooltip: true } },
  {
    title: "actions",
    key: "actions",
    width: 180,
    align: "center",
    render: (row: Item) => {
      if (row.status !== RequestStatus.PENDING) {
        return h("span", { style: "color:#999;" }, "—");
      }
      return h(
        "div",
        { style: "display:flex;gap:8px;justify-content:center;" },
        [
          h(
            NButton,
            { size: "small", type: "primary", onClick: () => approve(row) },
            { default: () => "approve" }
          ),
          h(
            NButton,
            { size: "small", type: "error", onClick: () => reject(row) },
            { default: () => "reject" }
          ),
        ]
      );
    },
  },
]);
</script>
