<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Rutas</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar por nombre..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-subway"></i> Nombre de la ruta</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRutas.length === 0">
            <td colspan="6" class="text-center">Sin registros de Rutas</td>
          </tr>
          <tr v-for="ruta in filteredRutas" :key="ruta.id">
            <td>{{ ruta.date }}</td>
            <td>{{ ruta.nombre_ruta }}</td>
            <td>{{ ruta.descripcion_ruta }}</td>
            <td>{{ ruta.ubicacion_ruta }}</td>
            <td class="status">{{ ruta.estado_ruta }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="openOffCanvas('add')"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', ruta)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(ruta.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredRutas.length }} resultados encontrados: Mostrando página 1 de 100</p>
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
      searchQuery: '',
      form: {
        id: null,
        nombre_ruta: '',
        descripcion_ruta: '',
        ubicacion_ruta: '',
        estado_ruta: false
      },
      rutas: [
        { id: 1, date: '12 Jan 2022', nombre_ruta: 'Entrada Estación Quitumbe', descripcion_ruta: '15 gradas hacia abajo', ubicacion_ruta: 'Terminal Quitumbe', estado_ruta: 'Activo' },
        { id: 2, date: '15 Feb 2022', nombre_ruta: 'Salida Estación Quitumbe', descripcion_ruta: '20 gradas hacia arriba', ubicacion_ruta: 'Terminal Quitumbe', estado_ruta: 'Inactivo' },
        // Añade más rutas aquí según sea necesario
      ],
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  computed: {
    filteredRutas() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.rutas.filter(ruta => 
        ruta.nombre_ruta.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    openOffCanvas(action, ruta = null) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Ruta' : 'Editar Ruta';
      if (action === 'edit' && ruta) {
        this.form = { ...ruta }; // Clonamos el objeto para evitar modificaciones directas
      } else {
        this.form = {
          id: null,
          nombre_ruta: '',
          descripcion_ruta: '',
          ubicacion_ruta: '',
          estado_ruta: false
        };
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/Ruta');
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
          this.rutas = this.rutas.filter(ruta => ruta.id !== id);
          Swal.fire(
            '¡Borrado!',
            'La ruta ha sido borrada.',
            'success'
          );
        }
      });
    },
    submitForm() {
      // Validar campos vacíos
      if (!this.form.nombre_ruta || !this.form.descripcion_ruta || !this.form.ubicacion_ruta) {
        Swal.fire({
          title: 'Campos vacíos',
          text: 'Por favor, completa todos los campos.',
          icon: 'warning'
        });
        return;
      }

      if (this.form.id === null) {
        // Añadir una nueva ruta
        const newId = this.rutas.length ? Math.max(...this.rutas.map(e => e.id)) + 1 : 1;
        this.rutas.push({ ...this.form, id: newId, estado_ruta: this.form.estado_ruta ? 'Activo' : 'Inactivo' });
        Swal.fire('¡Agregado!', 'La ruta ha sido agregada.', 'success');
      } else {
        // Actualizar una ruta existente
        const index = this.rutas.findIndex(e => e.id === this.form.id);
        if (index !== -1) {
          this.rutas[index] = { ...this.form, estado_ruta: this.form.estado_ruta ? 'Activo' : 'Inactivo' };
          Swal.fire('¡Actualizado!', 'La ruta ha sido actualizada.', 'success');
        }
      }

      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped src="@/assets/styles/ruta/rutaView.css"></style>
