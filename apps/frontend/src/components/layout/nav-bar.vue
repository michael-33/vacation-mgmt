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
    <strong style="margin-right: auto; font-size: 18px"
      >vacation management</strong
    >

    <strong style="margin-right: 8px; color: #555; font-size: 16px"
      >select user:</strong
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { NSelect } from "naive-ui";
import { Role } from "common";

const store = useUserStore();
const router = useRouter();
const selectedId = ref<number>(store.selectedUserId);
const options = computed(() =>
  store.users.map((u) => ({ label: `${u.name} (${u.role})`, value: u.id }))
);

function onChange(val: number) {
  store.selectUser(val);
  const role = store.users.find((u) => u.id === val)!.role;
  router.push(role === Role.VALIDATOR ? "/validator" : "/requester");
}

watch(
  () => store.selectedUserId,
  (v) => (selectedId.value = v)
);
</script>
