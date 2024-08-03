<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="profile" v-if="user">
      <h2>Información del Usuario</h2>
      <div class="profile-info">
        <div class="profile-picture">
          <img src="https://cdn-icons-png.flaticon.com/128/4202/4202850.png" alt="Profile Picture" />
        </div>
        <div class="profile-details">
          <p>{{ user.nombre }}</p>
          <p>Usuario {{ user.rol }} de la página OpenBlind</p>
          <p>Dirección: Quito, 12 de diciembre y roca</p>
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
          <p>{{ user.estado ? 'Activo' : 'Inactivo' }}</p>
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
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'UserEdit',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    // Obtener el usuario del localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.$router.push('/'); // Redirigir si no hay usuario
    }
  },
};
</script>



<style scoped src="@/assets/styles/User/UserNew.css"></style>
