<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Punto de Interes</h2>
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
            <th><i class="fas fa-info-circle"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 Jan 2022</td>
            <td>Taquillera 1 El recreo</td>
            <td>Pago Boleteria</td>
            <td>Sur de Quito</td>
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
            <label for="fecha" class="form-label">Date <span class="required">*</span>:</label>
            <input type="date" id="fecha" v-model="form.fecha" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="nombres" class="form-label">Nombres <span class="required">*</span>:</label>
            <input type="text" id="nombres" v-model="form.nombres" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="descripcion" v-model="form.descripcion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="ubicacion" class="form-label">Ubicación <span class="required">*</span>:</label>
            <input type="text" id="ubicacion" v-model="form.ubicacion" class="form-control" required>
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
import Swal from 'sweetalert2';

export default {
  name: 'PuntoInteresView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      form: {
        fecha: '',
        nombres: '',
        descripcion: '',
        ubicacion: '',
        estado_usuario: false
      },
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  methods: {
    openOffCanvas(action) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Punto de Interes' : 'Editar Punto de Interes';
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/PuntoInteres');
    },
    handleDeleteClick() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Borrado!',
            'El punto de interés ha sido borrado.',
            'success'
          )
        }
      })
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    submitForm() {
      Swal.fire({
        title: 'Datos enviados',
        text: `
          Fecha: ${this.form.fecha}
          Nombres: ${this.form.nombres}
          Descripción: ${this.form.descripcion}
          Ubicación: ${this.form.ubicacion}
          Estado: ${this.form.estado_usuario ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
      });
      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped src="@/assets/styles/puntoInteres/puntoInteresView.css"></style>

