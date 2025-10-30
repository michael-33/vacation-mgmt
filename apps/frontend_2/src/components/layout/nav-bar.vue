<template>
  <div
    style="
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-bottom: 1px solid #eee;
    "
  >
    <strong style="margin-right: auto">vacation management</strong>

    <RouterLink to="/requester">requester</RouterLink>
    <RouterLink to="/validator" style="margin-right: 16px"
      >validator</RouterLink
    >

    <n-select
      style="width: 220px"
      :options="options"
      v-model:value="selectedId"
      @update:value="onChange"
      placeholder="select user"
    />
  </div>
</template>

<script setup lang="ts">
// nav with user switcher using naive ui
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { NSelect } from "naive-ui";
// const nSelect = NSelect; // fix linting error

const store = useUserStore();
const selectedId = ref<number>(store.selectedUserId);
const options = computed(() =>
  store.users.map((u) => ({ label: `${u.name} (${u.role})`, value: u.id })),
);

function onChange(val: number) {
  store.selectUser(val);
}

watch(
  () => store.selectedUserId,
  (v) => (selectedId.value = v),
);
</script>
