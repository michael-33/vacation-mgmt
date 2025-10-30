import { defineStore } from 'pinia';
import { setUserIdHeader } from '@/services/api';
import { Role } from 'common';

export interface UiUser {
  id: number;
  name: string;
  role: Role;
}

// TODO: put thisin common
// seed users to match the backend seeds
const SEEDED_USERS: UiUser[] = [
  { id: 1, name: 'Alice', role: Role.REQUESTER },
  { id: 2, name: 'Bob', role: Role.REQUESTER },
  { id: 3, name: 'Charlie', role: Role.VALIDATOR }
];

export const useUserStore = defineStore('user', {
  state: () => ({
    users: SEEDED_USERS as UiUser[],
    selectedUserId: 1 as number
  }),
  getters: {
    selectedUser(state) {
      return state.users.find(u => u.id === state.selectedUserId)!;
    }
  },
  actions: {
    selectUser(id: number) {
      this.selectedUserId = id;
      setUserIdHeader(id);
    }
  }
});

// initialize default header once
setUserIdHeader(SEEDED_USERS[0].id);
