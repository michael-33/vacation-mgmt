import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/requester" },
  {
    path: "/requester",
    component: () =>
      import("@/modules/requester/pages/requester-dashboard.page.vue"),
  },
  {
    path: "/validator",
    component: () =>
      import("@/modules/validator/pages/validator-dashboard.page.vue"),
  },
];

export default createRouter({ history: createWebHistory(), routes });
