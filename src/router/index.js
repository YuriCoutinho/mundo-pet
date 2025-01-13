import Vue from "vue";
import VueRouter from "vue-router";

import { parseJwt } from "@/utils/parseJwt";
import store from "@/store/index";

import LoginView from "../views/LoginView.vue";
import AppointmentsView from "../views/AppointmentsView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import ClientsView from "../views/ClientsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (token) {
        next({ name: "Agendamentos" });
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/agendamentos",
    name: "Agendamentos",
    component: AppointmentsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/funcionarios",
    name: "Funcionarios",
    component: EmployeesView,
    meta: {
      requiresAuth: true,
      role: "ADMIN",
    },
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: ClientsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    component: PageNotFoundView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next({ name: "login" });
    } else {
      const { type } = parseJwt(token) || {};

      store.commit("auth/setType", type || "");

      if (
        to.matched.some((record) => record.meta.role === "ADMIN") &&
        store.state.auth.user.type !== "ADMIN"
      ) {
        return next({ name: "Agendamentos" });
      }
    }
  }

  next();
});

export default router;
