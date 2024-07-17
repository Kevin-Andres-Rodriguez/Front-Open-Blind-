<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Usuarios</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar...">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-user"></i> Nombres</th>
            <th><i class="fas fa-id-card-alt"></i> Apellidos</th>
            <th><i class="fas fa-at"></i> Correo</th>
            <th><i class="fas fa-phone-alt"></i> Teléfono</th>
            <th><i class="fas fa-birthday-cake"></i> F.Nacimiento</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 Jan 2022</td>
            <td>Juan</td>
            <td>Andrade</td>
            <td>juandandrade@gmail.com</td>
            <td>0987475123</td>
            <td>14-04-2002</td>
            <td class="status">Activo</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="redirectToForm"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit')"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>8 results found: Showing page 1 of 100</p>
        <button>Previous</button>
        <button class="active">1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
    <div :class="['off-canvas', { open: isOffCanvasOpen }]">
      <div class="off-canvas-header">
        <h2>{{ offCanvasTitle }}</h2>
        <button @click="closeOffCanvas" class="close-btn">&times;</button>
      </div>
      <div class="off-canvas-body">
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="nombre_usuario" class="form-label">Nombres <span class="required">*</span>:</label>
            <input type="text" id="nombre_usuario" v-model="form.nombre_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="apellido_usuario" class="form-label">Apellidos <span class="required">*</span>:</label>
            <input type="text" id="apellido_usuario" v-model="form.apellido_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="correo_usuario" class="form-label">Email <span class="required">*</span>:</label>
            <input type="email" id="correo_usuario" v-model="form.correo_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="telefono_usuario" class="form-label">Teléfono <span class="required">*</span>:</label>
            <input type="text" id="telefono_usuario" v-model="form.telefono_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="fecha_nacimiento_usuario" class="form-label">Fecha de Nacimiento <span class="required">*</span>:</label>
            <input type="date" id="fecha_nacimiento_usuario" v-model="form.fecha_nacimiento_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado_usuario" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estado_usuario">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="form-group-button">
            <button type="submit" class="btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'UserView',
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
        nombre_usuario: '',
        apellido_usuario: '',
        correo_usuario: '',
        telefono_usuario: '',
        fecha_nacimiento_usuario: '',
        estado_usuario: false
      },
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  methods: {
    openOffCanvas(action) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Usuario' : 'Editar Usuario';
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/register');
    },
    handleDeleteClick() {
      alert('Botón de eliminar clickeado');
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    submitForm() {
      alert(`
        Nombres: ${this.form.nombre_usuario}
        Apellidos: ${this.form.apellido_usuario}
        Email: ${this.form.correo_usuario}
        Teléfono: ${this.form.telefono_usuario}
        Fecha de Nacimiento: ${this.form.fecha_nacimiento_usuario}
        Estado: ${this.form.estado_usuario ? 'Activo' : 'Inactivo'}
      `);
      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1950px;
  width: 90%;
  text-align: center; /* Centrando el contenido horizontalmente */
}

.header {
  background-color: #e0e4e8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center; /* Centrando el contenido horizontalmente */
}

.header h2 {
  margin: 0;
  font-size: 24px;
}

.search-box {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: auto; /* Alinea la caja de búsqueda a la derecha */
}

.search-box input {
  border: none;
  outline: none;
  margin-left: 5px;
}

.table-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: left;
  white-space: nowrap;
}

th {
  background-color: #f0f2f5;
  color: #333;
  font-weight: bold;
}

th:nth-child(1),
td:nth-child(1) {
  width: 12.5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 12.5%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 12.5%;
}

th:nth-child(4),
td:nth-child(4) {
  width: 12.5%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 12.5%;
}

th:nth-child(6),
td:nth-child(6) {
  width: 12.5%;
}

th:nth-child(7),
td:nth-child(7) {
  width: 12.5%;
}

th:nth-child(8),
td:nth-child(8) {
  width: 12.5%;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

tr:hover {
  background-color: #f1f1f1;
}

.actions i {
  margin-right: 10px;
  cursor: pointer;
}

.actions i:hover {
  color: #007bff;
}

.pagination {
  display: flex;
  justify-content: center; /* Centrando la paginación horizontalmente */
  padding: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.pagination button {
  background-color: #e0e4e8;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}

.pagination p {
  margin: 0;
  margin-right: auto;
  color: #666;
}

.status {
  color: #28a745;
  font-weight: bold;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Off-Canvas Styles */

.off-canvas {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1000;
}

.off-canvas.open {
  right: 0;
}

.off-canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  background-color: #007bff;
  color: #fff;
}

.off-canvas-body {
  padding: 10px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  cursor: pointer;
}

.form {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  flex: 1 1 100%; /* Asegura que los campos del formulario ocupen el ancho completo */
  margin: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
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

.form-group-button {
  text-align: center;
  width: 100%;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>