<template>
  <div id="app">
    <aside class="sidebar">
      <div class="logo">
        <h1>Open</h1>
        <h2>Blind</h2>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/" class="active">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/create/EstacionMetro">
              <i class="fas fa-map-marker-alt"></i> Estaciones
            </router-link>
          </li>
          <li>
            <router-link to="/create/PuntoInteres">
              <i class="fas fa-map-signs"></i> Puntos de Interés
            </router-link>
          </li>
          <li>
            <router-link to="/create/Ruta">
              <i class="fas fa-route"></i> Rutas
            </router-link>
          </li>
          <li>
            <router-link to="/create/MensajePersonalizado">
              <i class="fas fa-envelope"></i> Mensajes Personalizados
            </router-link>
          </li>
          <li>
            <router-link to="/create/GuiaVoz">
              <i class="fas fa-headset"></i> Guía de Voz
            </router-link>
          </li>
          <li class="submenu">
            <router-link to="/history">
              <i class="fas fa-history"></i> Historial
            </router-link>
            <ul>
              <li><router-link to="/history/users">Usuarios</router-link></li>
              <li><router-link to="/view/EstacionMetro">Estaciones</router-link></li>
              <li><router-link to="/view/PuntoInteres">Puntos de Interés</router-link></li>
              <li><router-link to="/viewMensaje/Personalizado">Mensajes Personalizados</router-link></li>
              <li><router-link to="/view/Ruta">Rutas</router-link></li>
              <li><router-link to="/view/GuiaVoz">Guía de Voz</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
  <router-view/>
</template>

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
}

.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  padding-top: 20px;
}

.logo {
  text-align: center;
  padding-bottom: 20px;
}

.logo h1 {
  font-size: 24px;
  color: black;
}

.logo h2 {
  font-size: 18px;
  color: gray;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  padding: 10px;
  padding-left: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #6c757d;
  display: flex;
  align-items: center;
}

nav ul li a i {
  margin-right: 10px;
}

nav ul li a:hover  {
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
</style>