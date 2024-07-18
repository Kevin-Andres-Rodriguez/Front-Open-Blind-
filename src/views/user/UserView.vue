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

<style scoped src="@/assets/styles/User/UserView.css"></style>