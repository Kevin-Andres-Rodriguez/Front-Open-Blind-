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
          <form @submit.prevent="login">
              <input type="email" placeholder="Email Address" required v-model="email">
              <input type="password" placeholder="Password" required v-model="password">

              <router-link to="/dashboard" class="custom-btn active">Iniciar Sesión</router-link>

            
              <div class="register-link">
                <p>¿Eres nuevo usuario?</p>
                <router-link to="/register">
                   <i ></i> Registrate
                </router-link>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          email: 'prueba@prueba.com',
          password: '1234567'
      };
  },
  methods: {
      login() {
          // Aquí podrías agregar lógica para validar y autenticar el usuario
          // Simulando una redirección a '/home' después de autenticar
          console.log('Usuario autenticado:', this.email);
          this.$router.push('/home');
      }
  }
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente */
</style>


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
    margin-right: -20%;
}

.logo h1 {
    font-size: 4em;

}

.logo .blind {
    color: #d6d6d6;
    font-size: 0.75em
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



</style>
