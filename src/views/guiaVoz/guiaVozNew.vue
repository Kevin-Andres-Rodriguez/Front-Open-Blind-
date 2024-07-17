<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo">
        <h1>Crear Nueva Guía de Voz</h1>
      </div>
      <br>
      <form @submit.prevent="submitForm" class="form">                
        <div class="form-group">
          <label for="descripcion_g" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="descripcion_g" v-model="form.descripcion_g" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="audio_url" class="form-label">Audio URL<span class="required">*</span>:</label>
          <input type="text" id="audio_url" v-model="form.audio_url" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="idioma" class="form-label">Idioma <span class="required">*</span>:</label>
          <input type="text" id="idioma" v-model="form.idioma" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estado" class="form-label">Estado <span class="required">*</span>:</label>
          <label class="switch">
            <input type="checkbox" v-model="form.estado">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="form-group-button">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'GuiaVozNew',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
      form: {
        descripcion_g: '',
        audio_url: '',
        idioma: '',        
        estado: false
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 20px;
  padding: 15px;
  width: calc(100% - 220px); 
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.titulo{
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #343a40;
}

.form-label .required {
  color: red;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control:hover {
  border-color: #80bdff;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-group-button {
  display: flex;
  justify-content: center; 
}

.btn-primary {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>