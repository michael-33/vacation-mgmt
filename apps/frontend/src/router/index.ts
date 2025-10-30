import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { Role } from "common";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/requester" },
  {
    path: "/requester",
    component: () =>
      import("@/modules/requester/pages/requester-dashboard.page.vue"),
    meta: { role: Role.REQUESTER },
  },
  {
    path: "/validator",
    component: () =>
      import("@/modules/validator/pages/validator-dashboard.page.vue"),
    meta: { role: Role.VALIDATOR },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/modules/common/pages/not-found.page.vue"),
  },
];
const router = createRouter({ history: createWebHistory(), routes });

// a role guard to prevent authorization issues
router.beforeEach((to) => {
  const required = to.meta.role as Role | undefined;
  if (!required) return true;
  const store = useUserStore();
  const role = store.selectedUser.role;

  if (role !== required) {
    return role === Role.VALIDATOR ? "/validator" : "/requester";
  }
  return true;
});

export default router;
