<template>
    <div class="container">

      <div class="main-content">
        <div class="about">
          <h1>Esta es una página de acerca de</h1>
          <form @submit.prevent="submitForm">
            <div>
              <label for="name">Nombre:</label>
              <input type="text" id="name" v-model="form.name">
            </div>
            <div>
              <label for="email">Correo electrónico:</label>
              <input type="email" id="email" v-model="form.email">
            </div>
            <div>
              <label for="message">Mensaje:</label>
              <textarea id="message" v-model="form.message"></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Aquí puedes manejar el envío del formulario
        console.log(this.form);
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
  }
  
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 10px 0;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
  }
  
  .about form {
    display: flex;
    flex-direction: column;
  }
  
  .about form div {
    margin-bottom: 15px;
  }
  
  .about form label {
    margin-bottom: 5px;
  }
  
  .about form input,
  .about form textarea {
    padding: 10px;
    font-size: 16px;
    width: 100%;
  }
  
  .about form button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  