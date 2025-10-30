<template>
  <n-form
    @submit.prevent="onSubmit"
    style="display: grid; gap: 12px; max-width: 520px"
  >
    <n-date-picker
      v-model:value="dates"
      type="daterange"
      clearable
      :is-date-disabled="disablePast"
    />
    <n-input
      v-model:value="reason"
      type="textarea"
      placeholder="reason (optional)"
    />
    <n-button type="primary" attr-type="submit">submit</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NForm, NDatePicker, NInput, NButton, useMessage } from "naive-ui";
import api from "@/services/api";
import { RequestStatus } from "common";

const message = useMessage();
const dates = ref<[number, number] | null>(null); // timestamps
const reason = ref<string>("");
const emit = defineEmits<{ (e: "submitted"): void }>();
const props = withDefaults(
  defineProps<{
    existing?: Array<{
      start_date: string;
      end_date: string;
      status: RequestStatus;
    }>;
  }>(),
  { existing: () => [] }
);

function disablePast(ts: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return ts < d.getTime();
}

function formatLocalDate(ts: number) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function onSubmit() {
  if (!dates.value) {
    message.error("please pick a date range");
    return;
  }
  const [start, end] = dates.value;
  try {
    // prevent past dates even if user typed manually
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today.getTime() || end < start) {
      message.error("please choose valid future dates");
      return;
    }
    // client-side overlap validation against existing non-rejected requests
    const startStr = formatLocalDate(start);
    const endStr = formatLocalDate(end);
    const hasOverlap = props.existing.some((r) => {
      if (r.status === RequestStatus.REJECTED) return false;
      return !(r.end_date < startStr || r.start_date > endStr);
    });
    if (hasOverlap) {
      message.error("dates overlap with an existing request");
      return;
    }
    await api.post("/requests", {
      startDate: formatLocalDate(start),
      endDate: formatLocalDate(end),
      reason: reason.value || null,
    });
    message.success("request submitted");
    dates.value = null;
    reason.value = "";
    // emit to parent to reload table
    emit("submitted");
  } catch (e) {
    console.error(e);
  }
}
</script>
