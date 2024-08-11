<template>
  <Navegation />
  <div class="content">
    <div class="nav">
      <Nav />
    </div>

    <div class="profile" v-if="user">
      <h2>Información del Usuario</h2>
      <div class="profile-info">
        <div class="profile-details">
          <p>{{ user.nombre }}</p>
          <p>Usuario {{ user.rol }} de la página OpenBlind</p>
        </div>
      </div>
      <div class="additional-info">
        <div class="info-item">
          <span>Nombre</span>
          <p>{{ user.nombre }}</p>
        </div>
        <div class="info-item">
          <span>Apellido</span>
          <p>{{ user.apellido }}</p>
        </div>
        <div class="info-item">
          <span>Teléfono</span>
          <p>{{ user.telefono }}</p>
        </div>
        <div class="info-item">
          <span>Email</span>
          <p>{{ user.correo }}</p>
        </div>
        <div class="info-item">
          <span>Estado</span>
          <p>{{ user.estado ? "Activo" : "Inactivo" }}</p>
        </div>
        <div class="info-item">
          <span>Fecha de Nacimiento</span>
          <p>{{ user.fechaNacimiento }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Navegation from "@/components/Navegation.vue";

export default {
  name: "UserEdit",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    // Obtener el usuario del localStorage
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.$router.push("/"); // Redirigir si no hay usuario
    }
  },
};
</script>

<style scoped>
/* Estilos generales para pantallas normales */
.nav {
  width: 100%;
}

/* Estilos específicos para pantallas pequeñas (responsive) */
@media (max-width: 768px) {
  .nav {
    position: fixed; /* Fijar en la parte superior */
    top: -9.3%; /* Alineado al principio de la página */
    left: 50.3%; /* Centrando horizontalmente */
    transform: translateX(-50%); /* Ajusta el centro */
    width: 100%;
    max-width: 600px; /* Limitar el ancho máximo */
    z-index: 10; /* Asegura que esté encima del contenido */

    padding: 1px; /* Ajusta el padding si es necesario */
  }

  .content {
    margin-top: 115px; /* Añadir espacio suficiente en la parte superior para el nav */
    position: relative;
  }
}
</style>

<style scoped src="@/assets/styles/User/UserNew.css"></style>
