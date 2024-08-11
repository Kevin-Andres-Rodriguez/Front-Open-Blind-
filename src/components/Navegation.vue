<template>
  <div id="app">
    <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <div class="logo">
        <h1>
          <span class="open" v-if="!isCollapsed">Open</span>
          <span class="blind" v-if="!isCollapsed">Blind</span>
          <span v-if="isCollapsed" class="logo-collapsed">
            <span class="open-collapsed">O</span>
            <span class="blind-collapsed">B</span>
          </span>
        </h1>
      </div>
      <button @click="toggleSidebar" class="toggle-btn">
        <i
          :class="['fas', isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left']"
        ></i>
      </button>
      <nav>
        <ul>
          <li>
            <router-link to="/dashboard" class="active">
              <i class="fas fa-tachometer-alt"></i>
              <span v-if="!isCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/User" class="active">
              <i class="fas fa-user"></i>
              <span v-if="!isCollapsed">Usuario</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/EstacionMetro">
              <i class="fas fa-map-marker-alt"></i>
              <span v-if="!isCollapsed">Estaciones</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/PuntoInteres">
              <i class="fas fa-map-signs"></i>
              <span v-if="!isCollapsed">Puntos de Interés</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/Ruta">
              <i class="fas fa-route"></i>
              <span v-if="!isCollapsed">Rutas</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/MensajePersonalizado">
              <i class="fas fa-envelope"></i>
              <span v-if="!isCollapsed">Mensajes Personalizados</span>
            </router-link>
          </li>
          <li>
            <router-link to="/create/GuiaVoz">
              <i class="fas fa-headset"></i>
              <span v-if="!isCollapsed">Guía de Voz</span>
            </router-link>
          </li>
          <li class="submenu">
            <router-link to="">
              <i class="fas fa-history"></i>
              <span v-if="!isCollapsed">Historial</span>
            </router-link>
            <ul v-if="!isCollapsed">
              <li><router-link to="/view/user">Usuarios</router-link></li>
              <li>
                <router-link to="/view/EstacionMetro">Estaciones</router-link>
              </li>
              <li>
                <router-link to="/view/PuntoInteres"
                  >Puntos de Interés</router-link
                >
              </li>
              <li>
                <router-link to="/viewMensaje/Personalizado"
                  >Mensajes Personalizados</router-link
                >
              </li>
              <li><router-link to="/view/Ruta">Rutas</router-link></li>
              <li><router-link to="/view/GuiaVoz">Guía de Voz</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  min-height: 100vh;
  background-color: #f0f5fb;
}

.sidebar {
  flex: 0 0 215px;
  background-color: #ffffff;
  padding-top: 25px;
  transition: width 0.3s ease, left 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  flex: 0 0 60px;
}

.sidebar nav ul li a span {
  display: inline-block;
}

.sidebar-collapsed nav ul li a span {
  display: none;
}

.logo {
  text-align: center;
  padding-bottom: 20px;
}

.logo h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.5em;
}

.logo .open {
  font-weight: bold;
  color: black;
  font-size: 1em;
  display: block;
  line-height: 0.8em;
}

.logo .blind {
  color: gray;
  font-size: 1em;
  display: block;
  margin-left: 60px;
  margin-top: 5px;
}

.logo .open-collapsed {
  font-weight: bold;
  color: black;
  font-size: 1.2em;
  display: block;
  line-height: 0.8em;
}

.logo .blind-collapsed {
  color: gray;
  font-size: 1.2em;
  display: block;
}

.sidebar-collapsed .logo .open,
.sidebar-collapsed .logo .blind {
  display: none;
}

.sidebar-collapsed .logo .logo-collapsed {
  display: inline-block;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  padding: 10px;
  padding-left: 20px;
  transition: transform 0.3s ease;
}

nav ul li a {
  text-decoration: none;
  color: #6c757d;
  display: flex;
  align-items: center;
  font-size: 16px;
}

nav ul li a i {
  margin-right: 10px;
}

nav ul li:hover {
  transform: translateX(10px);
}

nav ul li a:hover {
  background-color: #e9ecef;
  border-radius: 4px;
}

.submenu ul {
  display: none;
  padding-left: 20px;
}

.submenu:hover ul {
  display: block;
}

.submenu ul li {
  position: relative;
  padding-left: 20px;
  margin-top: 5px;
}

.submenu ul li::before {
  content: "-";
  position: absolute;
  left: 0;
  color: #000000;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 20px;
}
/* Estilos responsivos */

/* Media query para pantallas pequeñas */
/* Media query para pantallas pequeñas */
/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  .sidebar {
    background: transparent; /* Fondo negro con 50% de opacidad */
  }

  .sidebar:not(.sidebar-collapsed) nav {
    background-color: transparent; /* Asegura que el fondo del menú sea transparente */
    box-shadow: none; /* Quita cualquier sombra que pueda estar causando problemas */
  }
  .sidebar-collapsed {
    flex: 0 0 60px; /* Ancho de la barra lateral colapsada */
  }

  .logo {
    display: none; /* Ocultar el logo cuando la barra lateral esté colapsada */
  }

  nav {
    display: none; /* Ocultar el menú de navegación cuando la barra lateral esté colapsada */
  }

  .sidebar:not(.sidebar-collapsed) nav {
    display: block; /* Mostrar el menú de navegación cuando la barra lateral no esté colapsada */
    position: fixed; /* Posiciona el menú en relación con la barra lateral */
    top: 0;
    left: 130px; /* Coloca el menú a la derecha de la barra lateral colapsada */
    width: calc(65%); /* Ajusta el ancho para ocupar el espacio restante */
    background-color: #ffffff; /* Color de fondo para el menú expandido */
    padding-top: 25px; /* Espacio en la parte superior del menú */
    height: 100vh; /* Asegura que el menú ocupe toda la altura de la pantalla */
    overflow-y: auto; /* Permite el desplazamiento del contenido verticalmente */
    z-index: 100; /* Asegura que el menú esté sobre otros elementos */
  }

  .toggle-btn {
    position:fixed; /* Posiciona el botón dentro de la barra lateral */
    top: 10px; /* Ajusta el margen superior */
    left: 10px; /* Ajusta el margen izquierdo */
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em; /* Tamaño de la flecha */
    color: #333; /* Color de la flecha */
    z-index: 101; /* Asegura que el botón esté sobre el contenido */
  }
}
</style>
