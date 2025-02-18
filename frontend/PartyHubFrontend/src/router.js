import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import DashboardOrganizer from "./views/DashboardOrganizer.vue";
import DashboardUser from "./views/DashboardUser.vue";
import MisEventos from "./views/MisEventos.vue";

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

// Función para obtener el rol del usuario
function getUserRole() {
  return localStorage.getItem("role") || ""; // Si no existe, devolvemos una cadena vacía
}

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  
  // Redirección basada en el rol del usuario
  {
    path: "/",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login"); // Si no está autenticado, lo mandamos a login
      } else {
        const role = getUserRole();
        if (role === "organizer") {
          next("/dashboard-organizer");
        } else if (role === "user") {
          next("/dashboard-user");
        } else {
          next(); // Si es admin o no tiene rol definido, sigue en Home
        }
      }
    },
  },

  // Dashboard para organizadores
  {
    path: "/dashboard-organizer",
    component: DashboardOrganizer,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated() || getUserRole() !== "organizer") {
        next("/"); // Si no es organizer, lo mandamos a Home
      } else {
        next();
      }
    },
  },

  // Dashboard para usuarios
  {
    path: "/dashboard-user",
    component: DashboardUser,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated() || getUserRole() !== "user") {
        next("/"); // Si no es user, lo mandamos a Home
      } else {
        next();
      }
    },
  },

  // Página de eventos apuntados
  {
    path: "/mis-eventos",
    component: MisEventos,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login"); // Si no está autenticado, lo mandamos a login
      } else {
        next();
      }
    },
  },

  // Ruta de fallback para rutas desconocidas
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
