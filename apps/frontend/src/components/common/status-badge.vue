<template>
  <span :style="styleObj">{{ status }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RequestStatus } from "common";

const props = defineProps<{ status: RequestStatus }>();

const styleObj = computed(() => {
  const base =
    "padding:2px 8px;border-radius:12px;font-size:12px;text-transform:lowercase;";
  if (props.status === RequestStatus.APPROVED)
    return base + "background:#e6ffed;border:1px solid #a6f3b4;color:#117a3a;";
  if (props.status === RequestStatus.REJECTED)
    return base + "background:#ffecec;border:1px solid #ffb3b3;color:#a11;";
  return base + "background:#f0f7ff;border:1px solid #b9d8ff;color:#1453a1;";
});
</script>
