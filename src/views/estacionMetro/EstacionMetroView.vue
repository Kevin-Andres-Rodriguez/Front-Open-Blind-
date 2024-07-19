<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Estación de Metro</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar...">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-subway"></i> Nombre de la estación</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEstaciones.length === 0">
            <td colspan="6" class="text-center">Sin registros</td>
          </tr>
          <tr v-for="estacion in filteredEstaciones" :key="estacion.id">
            <td>{{ estacion.date }}</td>
            <td>{{ estacion.nombre_estacion }}</td>
            <td>{{ estacion.descripcion_estacion }}</td>
            <td>{{ estacion.ubicacion_estacion }}</td>
            <td class="status">{{ estacion.estado_estacion ? 'Activo' : 'Inactivo' }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="openOffCanvas('add')"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', estacion)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(estacion.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredEstaciones.length }} resultados encontrados: Página 1 de 100</p>
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
            <label for="nombre_estacion" class="form-label">Nombre de la estación <span class="required">*</span>:</label>
            <input type="text" id="nombre_estacion" v-model="form.nombre_estacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion_estacion" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="descripcion_estacion" v-model="form.descripcion_estacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="ubicacion_estacion" class="form-label">Ubicación <span class="required">*</span>:</label>
            <input type="text" id="ubicacion_estacion" v-model="form.ubicacion_estacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado_estacion" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estado_estacion">
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
  name: 'EstacionMetroView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      searchQuery: '',
      estaciones: [
        { id: 1, date: '12 Jan 2022', nombre_estacion: 'Quitumbe', descripcion_estacion: 'Sur de Quito', ubicacion_estacion: 'Av. Cóndor Ñan y Av. Mariscal Sucre', estado_estacion: true },
        { id: 2, date: '20 Jan 2022', nombre_estacion: 'Solanda', descripcion_estacion: 'Sur de Quito', ubicacion_estacion: 'Av. Ajavi', estado_estacion: true },
        // Añade más datos de estaciones aquí
      ],
      form: {
        id: null,
        nombre_estacion: '',
        descripcion_estacion: '',
        ubicacion_estacion: '',
        estado_estacion: false
      },
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  computed: {
    filteredEstaciones() {
      if (!this.searchQuery) {
        return this.estaciones;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.estaciones.filter(estacion => 
        estacion.nombre_estacion.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    openOffCanvas(action, estacion = null) {
      if (action === 'add') {
        this.offCanvasTitle = 'Agregar Estación';
        this.form = {
          id: null,
          nombre_estacion: '',
          descripcion_estacion: '',
          ubicacion_estacion: '',
          estado_estacion: false
        };
      } else {
        this.offCanvasTitle = 'Editar Estación';
        this.form = { ...estacion }; // Clonamos el objeto estacion para evitar modificaciones directas
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/EstacionMetro');
    },
    handleDeleteClick(estacionId) {
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
          // Remove the station from the array
          this.estaciones = this.estaciones.filter(estacion => estacion.id !== estacionId);

          Swal.fire(
            '¡Borrado!',
            'La estación ha sido borrada.',
            'success'
          );
        }
      });
    },
    submitForm() {
      if (!this.form.nombre_estacion || !this.form.descripcion_estacion || !this.form.ubicacion_estacion) {
        Swal.fire({
          title: 'Campos vacíos',
          text: 'Por favor, completa todos los campos.',
          icon: 'warning',
        });
        return;
      }

      if (this.form.id === null) {
        // Adding a new station (if ID is null)
        const newId = this.estaciones.length ? Math.max(...this.estaciones.map(e => e.id)) + 1 : 1;
        this.estaciones.push({ ...this.form, id: newId, date: new Date().toLocaleDateString() });
        Swal.fire('¡Agregado!', 'La estación ha sido agregada.', 'success');
      } else {
        // Updating an existing station
        const index = this.estaciones.findIndex(e => e.id === this.form.id);
        if (index !== -1) {
          this.estaciones[index] = { ...this.form };
          Swal.fire('¡Actualizado!', 'La estación ha sido actualizada.', 'success');
        }
      }

      this.closeOffCanvas();
    }
  }
};
</script>



<style scoped src="@/assets/styles/estacionMetro/estacionMetro.css"></style>
