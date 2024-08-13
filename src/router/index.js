import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//Import RUTA
import RutaNew from "../views/ruta/RutaNew.vue";
import RutaEdit from "@/views/ruta/RutaEdit.vue";
import RutaView from "@/views/ruta/RutaView.vue";

//Import MENSAJE PERSONALIZADO
import MensajePersonalizadoEdit from "@/views/mensajePersonalizado/MensajePersonalizadoEdit.vue";
import MensajePersonalizadoView from "@/views/mensajePersonalizado/MensajePersonalizadoView.vue";
import MensajePersonalizadoNew from "@/views/mensajePersonalizado/MensajePersonalizadoNew.vue";

//Import MENSAJE PERSONALIZADO
import GuiaVozEdit from "@/views/guiaVoz/guiaVozEdit.vue";
import GuiaVozNew from "@/views/guiaVoz/guiaVozNew.vue";
import GuiaVozView from "@/views/guiaVoz/guiaVozView.vue";

//Import PUNTO DE INTERES
import PuntoInteresNew from "@/views/puntoInteres/PuntoInteresNew.vue";
import PuntoInteresEdit from "@/views/puntoInteres/PuntoInteresEdit.vue";
import PuntoInteresView from "@/views/puntoInteres/PuntoInteresView.vue";

//Import ESTACION DE METRO
import EstacionMetroNew from "@/views/estacionMetro/EstacionMetroNew.vue";
import EstacionMetroEdit from "@/views/estacionMetro/EstacionMetroEdit.vue";
import EstacionMetroView from "@/views/estacionMetro/EstacionMetroView.vue";

//Import USER
import UserNew from "@/views/user/UserNew";
import UserEdit from "@/views/user/UserEdit";
import UserView from "@/views/user/UserView";

//Import DASHBOARD
import Dashboard from "@/views/dashboard/Dashboard.vue";

//Import REGISTRO
import Register from "@/views/register.vue";

//Import ERROR 
import Error  from "@/views/error/error.vue";

function isAuthenticated() {
  return !!localStorage.getItem('token'); // Verifica si el token existe en localStorage
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  //Route RUTA
  {
    path: "/create/Ruta",
    name: "createRuta",
    component: RutaNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/Ruta/:id",
    name: "editRuta",
    component: RutaEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/Ruta",
    name: "viewRuta",
    component: RutaView,
    meta: { requiresAuth: true }
  },

  //Route MENSAJE PERSONALIZADO
  {
    path: "/create/MensajePersonalizado",
    name: "createMensajePersonalizado",
    component: MensajePersonalizadoNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/editMensaje/Personalizado/:id",
    name: "editMensajePersonalizado",
    component: MensajePersonalizadoEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/viewMensaje/Personalizado",
    name: "viewMensajePersonalizado",
    component: MensajePersonalizadoView,
    meta: { requiresAuth: true }
  },

  //Route GUIA DE VOZ
  {
    path: "/create/GuiaVoz",
    name: "createGuiaVoz",
    component: GuiaVozNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/editGuia/Voz/:id",
    name: "editGuiaVoz",
    component: GuiaVozEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/GuiaVoz",
    name: "viewGuiaVoz",
    component: GuiaVozView,
    meta: { requiresAuth: true }
  },

  //Route PUNTO DE INTERES
  {
    path: "/create/PuntoInteres",
    name: "createPuntoInteres",
    component: PuntoInteresNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/PuntoInteres/:id",
    name: "editPuntoInteres",
    component: PuntoInteresEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/PuntoInteres",
    name: "viewPuntoInteres",
    component: PuntoInteresView,
    meta: { requiresAuth: true }
  },

  //Route ESTACION DE METRO
  {
    path: "/create/EstacionMetro",
    name: "createEstacionMetro",
    component: EstacionMetroNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/EstacionMetro/:id",
    name: "editEstacionMetro",
    component: EstacionMetroEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/EstacionMetro",
    name: "viewEstacionMetro",
    component: EstacionMetroView,
    meta: { requiresAuth: true }
  },
  //Route USER
  {
    path: "/create/User",
    name: "createUser",
    component: UserNew,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/User/:id",
    name: "editUser",
    component: UserEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/User",
    name: "viewUser",
    component: UserView,
    meta: { requiresAuth: true }
  },
  //Route DASHBOARD
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  //Route REGISTRO
  {
    path: "/register",
    name: "register",
    component: Register
  },
  //Router ERROR
  {
    path: "/access-denied",
    name: "error",
    component: Error
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ path: '/access-denied', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
