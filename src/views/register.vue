<template>
  <div class="main-container">
    <div class="image-section">
      <img src="@/img/inicio.jpg" alt="Persona con bastón y acompañante" />
    </div>
    <div class="login-container">
      <div class="login-section">
        <form @submit.prevent="register">
          <div class="logo">
            <h1>Open<span class="blind">Blind</span></h1>
            <p>Navegando con Confianza, Alcanzando Libertad</p>
          </div>
          <div class="name-group">
            <div class="input">
              <label for="nombreUsuario"
                >Nombre <span class="required">*</span></label
              >
              <input
                id="nombreUsuario"
                type="text"
                placeholder="Nombre"
                required
                v-model="form.nombreUsuario"
              />
            </div>
            <div class="input">
              <label for="apellidoUsuario"
                >Apellidos <span class="required">*</span></label
              >
              <input
                id="apellidoUsuario"
                type="text"
                placeholder="Apellidos"
                required
                v-model="form.apellidoUsuario"
              />
            </div>
          </div>
          <div class="input">
            <label for="correoUsuario"
              >Correo <span class="required">*</span></label
            >
            <input
              id="correoUsuario"
              type="email"
              placeholder="Correo"
              required
              v-model="form.correoUsuario"
            />
          </div>
          <div class="input password-input">
            <label for="contrasenaUsuario"
              >Contraseña <span class="required">*</span></label
            >
            <input
              id="contrasenaUsuario"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Contraseña"
              required
              v-model="form.contrasenaUsuario"
            />
            <button
              type="button"
              @click="togglePassword"
              class="password-toggle"
            >
              <i
                :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              ></i>
            </button>
          </div>
          <div class="input">
            <label for="telefonoUsuario"
              >Teléfono <span class="required">*</span></label
            >
            <input
              id="telefonoUsuario"
              type="number"
              placeholder="Teléfono"
              required
              v-model="form.telefonoUsuario"
            />
          </div>
          <div class="input">
            <label for="fechaNacimientoUsuario"
              >Fecha de Nacimiento <span class="required">*</span></label
            >
            <input
              id="fechaNacimientoUsuario"
              type="date"
              required
              v-model="form.fechaNacimientoUsuario"
            />
          </div>
          <button type="submit" class="custom-btn">Registrarse</button>
          <div class="register-link">
            <p>¿Ya tienes una cuenta?</p>
            <router-link to="/"> <i></i> Iniciar Sesión </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        nombreUsuario: "",
        apellidoUsuario: "",
        correoUsuario: "",
        contrasenaUsuario: "",
        telefonoUsuario: "",
        fechaNacimientoUsuario: "",
      },
      passwordVisible: false,
    };
  },
  methods: {
    async verificarCorreo() {
      try {
        const response = await axios.get(
          "http://localhost:4200/usuario/verificar-correo",
          {
            params: { correoUsuario: this.form.correoUsuario },
          }
        );
        if (response.status === 200) {
          Swal.fire(
            "Error",
            "El correo electrónico ya está registrado.",
            "error"
          );
          return false;
        }
        return true;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return true; // Correo disponible
        }
        Swal.fire("Error", "Hubo un error al verificar el correo.", "error");
        return false;
      }
    },
    async register() {
      // Validación de la contraseña
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(this.form.contrasenaUsuario)) {
        Swal.fire(
          "Error",
          "La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.",
          "error"
        );
        return;
      }

    // Validación del formato del correo electrónico
    // Requiere al menos un @, un . y que termine en .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;
    if (!emailRegex.test(this.form.correoUsuario)) {
      Swal.fire('Error', 'El correo electrónico debe tener el formato correcto (ejemplo: ejemplo@dominio.com).', 'error');
      return;
    }
      // Validación de la edad
      const birthDate = new Date(this.form.fechaNacimientoUsuario);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        Swal.fire(
          "Error",
          "Debes ser mayor de 18 años para registrarte.",
          "error"
        );
        return;
      }
      // Validación del teléfono
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(this.form.telefonoUsuario)) {
        Swal.fire(
          "Error",
          "El número de teléfono debe contener exactamente 10 dígitos.",
          "error"
        );
        return;
      }

      // Verifica la disponibilidad del correo antes de registrar
      const isEmailAvailable = await this.verificarCorreo();
      if (!isEmailAvailable) {
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:4200/usuario/crear",
          this.form
        );
        if (response.status === 200) {
          Swal.fire("Éxito", "Usuario creado con éxito", "success");
          this.$router.push("/");
        } else {
          Swal.fire("Error", "Error al registrar el usuario", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un error al registrar el usuario", "error");
      }
    },

    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped src="@/assets/styles/register.css"></style>
