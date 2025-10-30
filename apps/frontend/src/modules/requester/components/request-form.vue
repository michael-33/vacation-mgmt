<template>
  <n-form
    @submit.prevent="onSubmit"
    style="display: grid; gap: 12px; max-width: 520px"
  >
    <n-date-picker v-model:value="dates" type="daterange" clearable />
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

const message = useMessage();
const dates = ref<[number, number] | null>(null); // timestamps
const reason = ref<string>("");

async function onSubmit() {
  if (!dates.value) {
    message.error("please pick a date range");
    return;
  }
  const [start, end] = dates.value;
  try {
    await api.post("/requests", {
      startDate: new Date(start).toISOString().slice(0, 10),
      endDate: new Date(end).toISOString().slice(0, 10),
      reason: reason.value || null,
    });
    message.success("request submitted");
    dates.value = null;
    reason.value = "";
    // emit to parent to reload table
    defineEmits<{ (e: "submitted"): void }>().call(null, "submitted");
  } catch (e) {
    console.error(e);
  }
}
</script>
