<template>
    <div class="access-denied">
      <div class="content">
        <div class="image-section">
          <img src="../../img/error.png" alt="Acceso Denegado" />
        </div>
        <div class="message-section">
          <h1>Acceso Denegado</h1>
          <p>Debes iniciar sesión para acceder a esta página.</p>
          <router-link to="/">Iniciar Sesión</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccessDenied'
  };
  </script>
  
  <style scoped>
  .access-denied {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .image-section {
    margin-bottom: 20px;
  }
  
  .image-section img {
    max-width: 100%;
    height: auto;
  }
  
  .message-section h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .message-section p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  
  .message-section a {
    font-size: 1em;
    color: #007bff;
    text-decoration: none;
  }
  
  .message-section a:hover {
    text-decoration: underline;
  }
  </style>
  