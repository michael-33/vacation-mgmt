import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { setUserIdHeader } from "@/services/api";
import { Role } from "common";

export interface UiUser {
  id: number;
  name: string;
  role: Role;
}

// TODO: put thisin common
// seed users to match the backend seeds
const SEEDED_USERS: UiUser[] = [
  { id: 1, name: "Alice", role: Role.REQUESTER },
  { id: 2, name: "Bob", role: Role.REQUESTER },
  { id: 3, name: "Charlie", role: Role.VALIDATOR },
];

export const useUserStore = defineStore("user", () => {
  const users = ref<UiUser[]>(SEEDED_USERS);
  const selectedUserId = ref<number>(1);

  const selectedUser = computed(
    () => users.value.find((u) => u.id === selectedUserId.value)!
  );

  function selectUser(id: number) {
    selectedUserId.value = id;
    setUserIdHeader(id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("user.selectedUserId", String(id));
      } catch {}
    }
  }

  function hydrate() {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("user.selectedUserId");
      const id = saved ? Number(saved) : selectedUserId.value;
      if (Number.isFinite(id) && users.value.some((u) => u.id === id)) {
        selectedUserId.value = id;
        setUserIdHeader(id);
      } else {
        setUserIdHeader(selectedUserId.value);
      }
    } catch {
      setUserIdHeader(selectedUserId.value);
    }
  }

  return { users, selectedUserId, selectedUser, selectUser, hydrate };
});

// initialize default header once for SSR-safety (will be overridden by hydrate on client)
setUserIdHeader(SEEDED_USERS[0].id);
