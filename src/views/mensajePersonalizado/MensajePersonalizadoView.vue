<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Mensaje Personalizado</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar por descripción..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-envelope"></i> Mensaje</th>
            <th><i class="fas fa-address-book"></i> Contacto</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mensaje in filteredMensajes" :key="mensaje.id">
            <td>{{ mensaje.fecha }}</td>
            <td>{{ mensaje.mensaje }}</td>
            <td>{{ mensaje.contacto }}</td>
            <td class="status">{{ mensaje.estado_usuario }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="redirectToForm"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', mensaje)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(mensaje.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredMensajes.length }} resultados encontrados: Mostrando página 1 de 100</p>
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
            <label for="mensaje" class="form-label">Mensaje <span class="required">*</span>:</label>
            <input type="text" id="mensaje" v-model="form.mensaje" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="contacto" class="form-label">Contacto <span class="required">*</span>:</label>
            <input type="text" id="contacto" v-model="form.contacto" class="form-control" required>
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
  name: 'MensajePersonalizadoView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      searchQuery: '',
      form: {
        fecha: '',
        mensaje: '',
        contacto: '',
        estado_usuario: false
      },
      mensajes: [
        { id: 1, fecha: '12 Jan 2022', mensaje: 'Perdí completamente la vista', contacto: '0988754236', estado_usuario: 'Activo' },
        { id: 2, fecha: '15 Feb 2022', mensaje: 'Necesito ayuda con mi cuenta', contacto: '0998765432', estado_usuario: 'Inactivo' },
        // Añade más mensajes personalizados aquí según sea necesario
      ],
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  computed: {
    filteredMensajes() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.mensajes.filter(mensaje => 
        mensaje.mensaje.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    openOffCanvas(action, mensaje) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Mensaje' : 'Editar Mensaje Personalizado';
      if (action === 'edit') {
        this.form = { ...mensaje };
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/MensajePersonalizado');
    },
    handleDeleteClick(id) {
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
          this.mensajes = this.mensajes.filter(mensaje => mensaje.id !== id);
          Swal.fire(
            '¡Borrado!',
            'El mensaje ha sido borrado.',
            'success'
          )
        }
      })
    },
    submitForm() {
      Swal.fire({
        title: 'Datos enviados',
        text: `
          Fecha: ${this.form.fecha}
          Mensaje: ${this.form.mensaje}
          Contacto: ${this.form.contacto}
          Estado: ${this.form.estado_usuario ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
      });
      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped src="@/assets/styles/mensajePersonalizado/mensajePersonalizadoView.css"></style>
