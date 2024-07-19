<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Rutas</h2>
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
            <th><i class="fas fa-subway"></i> Nombre de la ruta</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i>Ubicación </th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 Jan 2022</td>
            <td>Entrada Estación Quitumbe </td>
            <td>15 gradas hacia abajo</td>
            <td>Terminal Quitumbe</td>
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
            <label for="nombre_ruta" class="form-label">Nombre de la ruta <span class="required">*</span>:</label>
            <input type="text" id="nombre_ruta" v-model="form.nombre_ruta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion_ruta" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="descripcion_ruta" v-model="form.descripcion_ruta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="ubicacion_ruta" class="form-label">Ubicación <span class="required">*</span>:</label>
            <input type="text" id="ubicacion_ruta" v-model="form.ubicacion_ruta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado_ruta" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estado_ruta">
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
  name: 'RutaView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      form: {
        nombre_ruta: '',
        descripcion_ruta: '',
        ubicacion_ruta: '',
        estado_ruta: false
      },
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  methods: {
    openOffCanvas(action) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Ruta' : 'Editar Ruta';
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/Ruta');
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
            'La ruta ha sido borrada.',
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
          Nombre de la ruta: ${this.form.nombre_ruta}
          Descripción: ${this.form.descripcion_ruta}
          Ubicación: ${this.form.ubicacion_ruta}
          Estado: ${this.form.estado_ruta ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
      });
      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped src="@/assets/styles/ruta/rutaView.css"></style>


