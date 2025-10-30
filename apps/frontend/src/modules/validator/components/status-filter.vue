<template>
    <n-select :options="opts" v-model:value="model" style="width:200px" />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { NSelect } from 'naive-ui';
  import { RequestStatus } from 'common';
  
  const props = defineProps<{ status?: RequestStatus | 'ALL' }>();
  const emit = defineEmits<{ (e:'update:status', v: RequestStatus | 'ALL'): void }>();
  
  const opts = [
    { label: 'all', value: 'ALL' },
    { label: 'pending', value: RequestStatus.PENDING },
    { label: 'approved', value: RequestStatus.APPROVED },
    { label: 'rejected', value: RequestStatus.REJECTED }
  ];
  
  const model = computed({
    get: () => props.status ?? 'ALL',
    set: (v) => emit('update:status', v as any)
  });
  </script>
  