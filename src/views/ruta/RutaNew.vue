<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nueva Ruta</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombreRuta" class="form-label">Nombre de la Ruta <span class="required">*</span>:</label>
          <input type="text" id="nombreRuta" v-model="form.nombreRuta" class="form-control" @blur="validateNombreRuta" required>
          <div v-if="errors.nombreRuta" class="error-message">{{ errors.nombreRuta }}</div>
        </div>
        <div class="form-group">
          <label for="descripcionRuta" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="descripcionRuta" v-model="form.descripcionRuta" class="form-control" rows="2" @blur="validateDescripcionRuta" required></textarea>
          <div v-if="errors.descripcionRuta" class="error-message">{{ errors.descripcionRuta }}</div>
        </div>
        <div class="form-group">
          <label for="ubicacionRuta" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacionRuta" v-model="form.ubicacionRuta" class="form-control" @blur="validateUbicacionRuta" required>
          <div v-if="errors.ubicacionRuta" class="error-message">{{ errors.ubicacionRuta }}</div>
        </div>
        <div class="form-group">
          <label for="estadoRuta" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadoRuta" v-model="form.estadoRuta" class="form-control" @blur="validateEstadoRuta" required>
          <div v-if="errors.estadoRuta" class="error-message">{{ errors.estadoRuta }}</div>
        </div>
        <div class="form-group-button">
          <button type="submit" class="btn btn-primary" @click="validateForm">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'RutaCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombreRuta: '',
        descripcionRuta: '',
        ubicacionRuta: '',
        estadoRuta: ''
      },
      errors: {
        nombreRuta: null,
        descripcionRuta: null,
        ubicacionRuta: null,
        estadoRuta: null
      }
    };
  },
  methods: {
    validateNombreRuta() {
      if (!this.form.nombreRuta) {
        this.errors.nombreRuta = 'El nombre de la ruta es obligatorio.';
      } else if (this.form.nombreRuta.length < 5) {
        this.errors.nombreRuta = 'El nombre de la ruta debe tener al menos 5 caracteres.';
      } else {
        this.errors.nombreRuta = null;
      }
    },
    validateDescripcionRuta() {
      if (!this.form.descripcionRuta) {
        this.errors.descripcionRuta = 'La descripción es obligatoria.';
      } else if (this.form.descripcionRuta.length < 5) {
        this.errors.descripcionRuta = 'La descripción debe tener al menos 5 caracteres.';
      } else {
        this.errors.descripcionRuta = null;
      }
    },
    validateUbicacionRuta() {
      if (!this.form.ubicacionRuta) {
        this.errors.ubicacionRuta = 'La ubicación es obligatoria.';
      } else if (this.form.ubicacionRuta.length < 5) {
        this.errors.ubicacionRuta = 'La ubicación debe tener al menos 5 caracteres.';
      } else {
        this.errors.ubicacionRuta = null;
      }
    },
    validateEstadoRuta() {
      if (!this.form.estadoRuta) {
        this.errors.estadoRuta = 'El estado es obligatorio.';
      } else if (this.form.estadoRuta.length < 5) {
        this.errors.estadoRuta = 'El estado debe tener al menos 5 caracteres.';
      } else {
        this.errors.estadoRuta = null;
      }
    },
    validateForm() {
      this.validateNombreRuta();
      this.validateDescripcionRuta();
      this.validateUbicacionRuta();
      this.validateEstadoRuta();

      return !this.errors.nombreRuta && !this.errors.descripcionRuta && !this.errors.ubicacionRuta && !this.errors.estadoRuta;
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/ruta', this.form);

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Ruta Creada',
            text: 'La ruta ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Limpiar el formulario
          this.form = {
            nombreRuta: '',
            descripcionRuta: '',
            ubicacionRuta: '',
            estadoRuta: ''
          };

          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear la ruta.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear la ruta:', error);
        }
      } else {
        // Mostrar mensaje de error de validación
        Swal.fire({
          title: 'Error',
          text: 'Por favor, corrija los errores en el formulario antes de enviarlo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
};
</script>



<style scoped src="@/assets/styles/ruta/rutaNew.css"></style>