import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import playlistRoutes from "./playlist";
import accountRoutes from "./account";
import inquiryRoutes from "./inquiry";
import adminRoutes from "./admin";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  ...playlistRoutes,
  ...accountRoutes,
  ...inquiryRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
