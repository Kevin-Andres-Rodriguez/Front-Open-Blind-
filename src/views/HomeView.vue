<template>
  <div class="container">
    <div class="image-section">
      <img src="@/img/inicio.jpg" alt="Persona con bastón y acompañante" />
    </div>
    <div class="login-section">
      <div class="logo mobile-only">
        <h1>Open<span class="blind">Blind</span></h1>
        <p>Navegando con Confianza, Alcanzando Libertad</p>
      </div>
      <form @submit.prevent="login">
        <div class="input">
          <label for="correoUsuario"><span class="required"></span></label>
          <input
            id="correoUsuario"
            type="email"
            placeholder="Correo"
            required
            v-model="form.correoUsuario"
          />
        </div>
        <div class="input">
          <label for="contrasenaUsuario"><span class="required"></span></label>
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
        <button type="submit">Iniciar Sesión</button>
        <div class="register-link">
          <p>¿Eres nuevo usuario?</p>
          <router-link to="/register"> <i></i> Regístrate </router-link>
        </div>
      </form>
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
        correoUsuario: "",
        contrasenaUsuario: "",
      },
      passwordVisible: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:4200/usuario/login",
          this.form
        );
        Swal.fire("Éxito", "Inicio de sesión exitoso", "success");

        const { usuario, token } = response.data;
        localStorage.setItem("user", JSON.stringify(usuario));
        localStorage.setItem("token", token);

        this.$router.push("/dashboard");
      } catch (error) {
        Swal.fire("Error", "Credenciales incorrectas", "error");
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
/* Estilos CSS del botón */
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  margin-right: -20%;
}

.logo h1 {
  font-size: 4em;
}

.logo .blind {
  color: #d6d6d6;
  font-size: 0.75em;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-right: -20%;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 9px;
  background-color: #dadada;
  width: 100%;
}

.password-toggle {
  position: absolute;
  top: 59%;
  right: 161px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Estilos responsive para móviles */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Cambia el diseño a columna en móviles */
    height: auto; /* Ajusta la altura para pantallas pequeñas */
  }

  .image-section {
    order: 1; /* La imagen aparece primero en móviles */
    margin-bottom: 20px; /* Añade espacio debajo de la imagen */
  }

  .login-section {
    order: 2; /* El formulario aparece debajo de la imagen en móviles */
    margin-right: 0; /* Elimina el margen negativo en móviles */
    padding: 20px; /* Reduce el padding en móviles */
    width: 100%; /* Asegura que el formulario ocupe todo el ancho disponible */
  }

  .logo {
    margin-right: 0; /* Elimina el margen negativo en móviles */
  }

  .logo h1 {
    font-size: 2.5em;
  }

  .password-toggle {
    top: 64%;
    right: 30px; /* Ajusta la posición del botón de mostrar contraseña en móviles */
  }

  form {
    max-width: 100%; /* Asegura que el formulario ocupe todo el ancho disponible */
    margin-top: -50px;
    margin-right: 0px; /* Elimina márgenes negativos en móviles */
  }

  .image-section img {
    max-width: 106%; /* Asegura que la imagen se ajuste al ancho del contenedor en móviles */
    height: auto; /* Mantiene la proporción de la imagen */
  }
}
</style>
