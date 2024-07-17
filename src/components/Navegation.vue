<template>
  <div id="app">
    <aside class="sidebar">
      <div class="logo">
        <h1><span class="open">Open</span><span class="blind">Blind</span></h1>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/dashboard" class="active">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/create/User" class="active">
              <i class="fas fa-user"></i> Usuario
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
            <router-link to="/dashboard">
              <i class="fas fa-history"></i> Historial
            </router-link>
            <ul>
              <li><router-link to="/view/user">Usuarios</router-link></li>
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
  min-height: 100vh; 
  background-color: #f0f5fb;
}

.sidebar {
  flex: 0 0 215px; 
  background-color: #ffffff;
  padding-top: 25px;
}

.logo {
  text-align: center;
  padding-bottom: 20px;
}

.logo h1 {
  font-size: 2.5em; 
}

.logo .open {
  font-weight: bold; 
  color: black;
  font-size: 1em; 
  display: block;
  line-height: 0.8em; 
   margin-right: 70px;
}

.logo .blind {
  color: gray;
  font-size: 1em; 
  display: block;
  margin-left: 70px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  padding: 10px;
  padding-left: 20px;
  transition: transform 0.3s ease; /* Añadir transición a los elementos del menú */
}

nav ul li a {
  text-decoration: none;
  color: #6c757d;
  display: flex;
  align-items: center;
  font-size: 16px; /* Tamaño de fuente aumentado para elementos de menú */
}

nav ul li a i {
  margin-right: 10px;
}

nav ul li:hover {
  transform: translateX(10px); /* Desplazar hacia la derecha al pasar el mouse */
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
  content: '-';
  position: absolute;
  left: 0;
  color: #000000; /* Color negro para el guion */
}
</style>