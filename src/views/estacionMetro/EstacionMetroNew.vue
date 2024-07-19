<template>
  <Navegation />

  <div class="content">
    <Nav />
    <div class="form-container">

      <form @submit.prevent="submitForm" class="form">
        <br>
        <div class="titulo"><h1>Crear Nueva Estación de Metro</h1></div>
        <br>
        <div class="form-group">
          <label for="station_name" class="form-label">Nombre de la Estación <span class="required">*</span>:</label>
          <input type="text" id="station_name" v-model="form.station_name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Descripción <span class="required">*</span>:</label>
          <input type="text" id="description" v-model="form.description" class="form-control" required>
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
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';
import Swal from 'sweetalert2';

export default {
  name: 'EstacionMetroEdit',
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
        station_name: '',
        description: '',
        location: '',
        status: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Nombre de la Estación: ${this.form.station_name}
          Descripción: ${this.form.description}
          Ubicación: ${this.form.location}
          Estado: ${this.form.status ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(this.form);
      // Aquí puedes agregar la lógica para enviar el formulario
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>



<style scoped src="@/assets/styles/estacionMetro/estacionMetroNew.css"></style>