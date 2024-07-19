<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Guia de Voz</h2>
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
            <th><i class="fas fa-info-circle"></i> Descripción</th>
            <th><i class="fas fa-volume-up"></i> Audio URL</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.description">
            <td>{{ item.date }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.audioUrl }}</td>
            <td class="status">{{ item.status }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="redirectToForm"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', item)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(item.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredItems.length }} results found: Showing page 1 of 100</p>
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
            <label for="date" class="form-label">Date <span class="required">*</span>:</label>
            <input type="date" id="date" v-model="form.date" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="description" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="description" v-model="form.description" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="audioUrl" class="form-label">Audio URL <span class="required">*</span>:</label>
            <input type="url" id="audioUrl" v-model="form.audioUrl" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="status" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.status">
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
  name: 'GuiaVozView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      searchQuery: '',
      form: {
        date: '',
        description: '',
        audioUrl: '',
        status: false
      },
      items: [
        { id: 1, date: '12 Jan 2022', description: 'Ingreso al Metro', audioUrl: 'https://www.youtube.com/', status: 'Activo' },
        { id: 2, date: '15 Feb 2022', description: 'Información adicional', audioUrl: 'https://www.example.com/', status: 'Inactivo' },
       
      ],
      isOffCanvasOpen: false,
      offCanvasTitle: ''
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(item => item.id.toString().includes(query) || 
                                        item.description.toLowerCase().includes(query) || 
                                        item.audioUrl.toLowerCase().includes(query));
    }
  },
  methods: {
    openOffCanvas(action, item) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Guia de Voz' : 'Editar Guia de Voz';
      if (action === 'edit') {
        this.form = { ...item };
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    redirectToForm() {
      this.$router.push('/create/GuiaVoz');
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
          this.items = this.items.filter(item => item.id !== id);
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
          Date: ${this.form.date}
          Descripción: ${this.form.description}
          Audio URL: ${this.form.audioUrl}
          Estado: ${this.form.status ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
      });
      this.closeOffCanvas();
    }
  }
};
</script>

<style scoped src="@/assets/styles/estacionMetro/estacionMetro.css"></style>

