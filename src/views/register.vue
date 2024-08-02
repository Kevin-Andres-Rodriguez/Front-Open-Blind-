<template>
  <div class="container">
    <div class="image-section">
      <img src="@/img/inicio.jpg" alt="Persona con bastón y acompañante">
    </div>
    <div class="login-section">
      <div class="logo">
        <h1>Open<span class="blind">Blind</span></h1>
        <p>Navegando con Confianza, Alcanzando Libertad</p>
      </div>
      <form @submit.prevent="register">
        <div class="name-group">
          <div class="input">
            <label for="nombreUsuario">Nombre <span class="required">*</span></label>
            <input id="nombreUsuario" type="text" placeholder="Nombre" required v-model="form.nombreUsuario">
          </div>
          <div class="input">
            <label for="apellidoUsuario">Apellidos <span class="required">*</span></label>
            <input id="apellidoUsuario" type="text" placeholder="Apellidos" required v-model="form.apellidoUsuario">
          </div>
        </div>
        <div class="input">
          <label for="correoUsuario">Correo <span class="required">*</span></label>
          <input id="correoUsuario" type="email" placeholder="Correo" required v-model="form.correoUsuario">
        </div>
        <div class="input password-input">
          <label for="contrasenaUsuario">Contraseña <span class="required">*</span></label>
          <input 
            id="contrasenaUsuario" 
            :type="passwordVisible ? 'text' : 'password'" 
            placeholder="Contraseña" 
            required 
            v-model="form.contrasenaUsuario"
          />
          <button type="button" @click="togglePassword" class="password-toggle">
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div class="input">
          <label for="telefonoUsuario">Teléfono <span class="required">*</span></label>
          <input id="telefonoUsuario" type="number" placeholder="Teléfono" required v-model="form.telefonoUsuario">
        </div>
        <div class="input">
          <label for="fechaNacimientoUsuario">Fecha de Nacimiento <span class="required">*</span></label>
          <input id="fechaNacimientoUsuario" type="date" placeholder="Fecha de Nacimiento" required v-model="form.fechaNacimientoUsuario">
        </div>
        <button type="submit" class="custom-btn active">Registrarse</button>
        <router-link to="/" class="register-link">
          <i></i> <span class="register-button">Iniciar Sesión</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        nombreUsuario: '',
        apellidoUsuario: '',
        correoUsuario: '',
        contrasenaUsuario: '',
        telefonoUsuario: '',
        fechaNacimientoUsuario: '',
      },
      passwordVisible: false,
    };
  },
  methods: {
    async register() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/usuario', this.form);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Usuario Creado',
          text: 'El usuario ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          nombreUsuario: '',
          apellidoUsuario: '',
          correoUsuario: '',
          contrasenaUsuario: '',
          telefonoUsuario: '',
          fechaNacimientoUsuario: '',
        };

        // Redirigir a otra página si es necesario
        this.$router.push('/dashboard');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el usuario.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear el usuario:', error);
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
};
</script>

<style scoped>
/* Estilos CSS del boton */
.custom-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #034494;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-section img {
  max-width: 130%;
  max-height: 100%;
}

.login-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: -20%;
}

.logo {
  text-align: center;
  margin-left: 85px;
}

.logo h1 {
  font-size: 2.5em;
  margin-right: 40px;
}

.logo .blind {
  color: #d6d6d6;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 330px;
  margin-right: -15%;
}

.name-group {
  display: flex;
  gap: 10px;
}

input {
  padding: 9px;
  margin: 3px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
}

.required {
  color: red;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 65%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.password-toggle i {
  font-size: 20px;
}

.register-link {
  text-align: center;
  margin-top: 10px;
}
</style>
