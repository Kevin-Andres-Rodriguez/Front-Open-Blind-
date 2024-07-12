<template>
  <div class="content">
    <div class="header-container">
      <h1>Registro de Rutas</h1>
      <div class="user-info">
        <span>Habla pelaoo</span>
        <img src="https://via.placeholder.com/40" alt="User Image">
      </div>
    </div>

    <div class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="date" class="form-label">Fecha <span class="required">*</span>:</label>
          <input type="date" id="date" v-model="form.date" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="route-name" class="form-label">Nombre de la ruta <span class="required">*</span>:</label>
          <input type="text" id="route-name" v-model="form.routeName" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="description" v-model="form.description" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="location" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="location" v-model="form.location" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="status" class="form-label">Estado <span class="required">*</span>:</label>
          <label class="switch">
            <input type="checkbox" v-model="form.status">
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
export default {
  data() {
    return {
      form: {
        date: '',
        routeName: '',
        description: '',
        location: '',
        status: false
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      // Aquí podrías agregar la lógica para enviar el formulario
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 20px;
  padding: 15px;
  width: calc(100% - 220px); /* Adjusted to reduce the width */
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container h1 {
  margin: 0;
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 10px;
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
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
  justify-content: center; /* Center the button horizontally */
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

/* Custom switch styling */
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
</style>
