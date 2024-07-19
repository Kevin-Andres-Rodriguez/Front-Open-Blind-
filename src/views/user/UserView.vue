<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Usuarios</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar..." v-model="searchQuery">
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
          <tr v-for="user in filteredUsers" :key="user.name">
            <td>{{ user.date }}</td>
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td>{{ user.correo }}</td>
            <td>{{ user.telefono }}</td>
            <td>{{ user.fechaNacimiento }}</td>
            <td class="status">{{ user.estado }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="redirectToForm"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit')"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredUsers.length }} results found: Showing page 1 of 100</p>
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
      searchQuery: '',
      users: [
        { id: 1, date: '12 Jan 2022', nombre: 'Juan', apellido: 'Andrade', correo: 'juandandrade@gmail.com', telefono: '0987475123', fechaNacimiento: '14-04-2002', estado: 'Activo' },
        { id: 2, date: '15 Feb 2022', nombre: 'Maria', apellido: 'Gomez', correo: 'maria.gomez@gmail.com', telefono: '0987654321', fechaNacimiento: '22-08-1995', estado: 'Inactivo' },
        { id: 3, date: '20 Mar 2022', nombre: 'Carlos', apellido: 'Perez', correo: 'carlos.perez@gmail.com', telefono: '0981234567', fechaNacimiento: '30-12-1988', estado: 'Activo' },
        { id: 4, date: '25 Apr 2022', nombre: 'Ana', apellido: 'Martinez', correo: 'ana.martinez@gmail.com', telefono: '0988765432', fechaNacimiento: '10-05-1999', estado: 'Inactivo' },
        { id: 5, date: '30 May 2022', nombre: 'Luis', apellido: 'Rodriguez', correo: 'luis.rodriguez@gmail.com', telefono: '0981112233', fechaNacimiento: '02-11-1975', estado: 'Activo' },
        { id: 6, date: '10 Jun 2022', nombre: 'Elena', apellido: 'Fernandez', correo: 'elena.fernandez@gmail.com', telefono: '0983334455', fechaNacimiento: '16-03-1985', estado: 'Inactivo' },
        { id: 7, date: '15 Jul 2022', nombre: 'Pablo', apellido: 'Lopez', correo: 'pablo.lopez@gmail.com', telefono: '0985556677', fechaNacimiento: '05-09-1990', estado: 'Activo' },
        { id: 8, date: '20 Aug 2022', nombre: 'Lucia', apellido: 'Ramirez', correo: 'lucia.ramirez@gmail.com', telefono: '0989990001', fechaNacimiento: '20-01-2000', estado: 'Inactivo' }
      ],
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => 
        user.nombre.toLowerCase().includes(query) ||
        user.id.toString().includes(query)
      );
    }
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
