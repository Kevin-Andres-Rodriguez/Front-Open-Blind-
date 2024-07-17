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
              <label for="nombre">Nombre <span class="required">*</span></label>
              <input id="nombre" type="text" placeholder="Nombre" required v-model="form.nombre">
            </div>
            <div class="input">
              <label for="apellidos">Apellidos <span class="required">*</span></label>
              <input id="apellidos" type="text" placeholder="Apellidos" required v-model="form.apellidos">
            </div>
          </div>
          <div class="input">
              <label for="email">Correo <span class="required">*</span></label>
              <input id="email" type="email" placeholder="Email" required v-model="form.email">
            </div>
          <div class="input">
              <label for="password">Contraseña <span class="required">*</span></label>
              <input id="password" type="text" placeholder="Password" required v-model="form.password">
            </div>
          <div class="input">
              <label for="tel">Teléfono <span class="required">*</span></label>
              <input id="tel" type="number" placeholder="Teléfono" required v-model="form.tel">
            </div>
          <div class="input">
              <label for="date">Fecha de Nacimiento <span class="required">*</span></label>
              <input id="date" type="date" placeholder="date" required v-model="form.date">
            </div>
       
            <router-link to="/dashboard" class="custom-btn active">Registrate</router-link>
          <router-link to="/" class="register-link">
          <i></i> <span class="register-button">Iniciar Sesión</span>
        </router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          nombre: 'Fatima',
          apellidos: 'Uroos',
          email: 'urus.dising@gmail.com',
          password: '12345',
          telefono: '',
          fecha_nacimiento: '',
          estado: ''
        }
      };
    },
    methods: {
      register() {
        console.log('Usuario registrado:', this.form);
      }
    }
  }
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
  


  .register-link {
  text-align: center; 
  margin-top: 10px; 
}

  </style>
  