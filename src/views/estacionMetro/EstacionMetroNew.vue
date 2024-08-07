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
          <label for="nombreEstacion" class="form-label">Nombre de la Estación <span class="required">*</span>:</label>
          <input type="text" id="nombreEstacion" v-model="form.nombreEstacion" class="form-control" @blur="validateNombreEstacion" required>
          <div v-if="errors.nombreEstacion" class="error-message">{{ errors.nombreEstacion }}</div>
        </div>
        <div class="form-group">
          <label for="descripcionEstacion" class="form-label">Descripción <span class="required">*</span>:</label>
          <input type="text" id="descripcionEstacion" v-model="form.descripcionEstacion" class="form-control" @blur="validateDescripcionEstacion" required>
          <div v-if="errors.descripcionEstacion" class="error-message">{{ errors.descripcionEstacion }}</div>
        </div>
        <div class="form-group">
          <label for="ubicacionEstacion" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacionEstacion" v-model="form.ubicacionEstacion" class="form-control" @blur="validateUbicacionEstacion" required>
          <div v-if="errors.ubicacionEstacion" class="error-message">{{ errors.ubicacionEstacion }}</div>
        </div>
        <div class="form-group">
          <label for="estadoEstacion" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadoEstacion" v-model="form.estadoEstacion" class="form-control" @blur="validateEstadoEstacion" required>
          <div v-if="errors.estadoEstacion" class="error-message">{{ errors.estadoEstacion }}</div>
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
  name: 'EstacionMetroCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombreEstacion: '',
        descripcionEstacion: '',
        ubicacionEstacion: '',
        estadoEstacion: ''
      },
      errors: {
        nombreEstacion: null,
        descripcionEstacion: null,
        ubicacionEstacion: null,
        estadoEstacion: null
      }
    };
  },
  methods: {
    validateNombreEstacion() {
      if (!this.form.nombreEstacion) {
        this.errors.nombreEstacion = 'El nombre de la estación es obligatorio.';
      } else if (this.form.nombreEstacion.length < 5) {
        this.errors.nombreEstacion = 'El nombre de la estación debe tener al menos 5 caracteres.';
      } else {
        this.errors.nombreEstacion = null;
      }
    },
    validateDescripcionEstacion() {
      if (!this.form.descripcionEstacion) {
        this.errors.descripcionEstacion = 'La descripción es obligatoria.';
      } else if (this.form.descripcionEstacion.length < 5) {
        this.errors.descripcionEstacion = 'La descripción debe tener al menos 5 caracteres.';
      } else {
        this.errors.descripcionEstacion = null;
      }
    },
    validateUbicacionEstacion() {
      if (!this.form.ubicacionEstacion) {
        this.errors.ubicacionEstacion = 'La ubicación es obligatoria.';
      } else if (this.form.ubicacionEstacion.length < 5) {
        this.errors.ubicacionEstacion = 'La ubicación debe tener al menos 5 caracteres.';
      } else {
        this.errors.ubicacionEstacion = null;
      }
    },
    validateEstadoEstacion() {
      if (!this.form.estadoEstacion) {
        this.errors.estadoEstacion = 'El estado es obligatorio.';
      } else if (this.form.estadoEstacion.length < 5) {
        this.errors.estadoEstacion = 'El estado debe tener al menos 5 caracteres.';
      } else {
        this.errors.estadoEstacion = null;
      }
    },
    validateForm() {
      this.validateNombreEstacion();
      this.validateDescripcionEstacion();
      this.validateUbicacionEstacion();
      this.validateEstadoEstacion();

      return !this.errors.nombreEstacion && !this.errors.descripcionEstacion && !this.errors.ubicacionEstacion && !this.errors.estadoEstacion;
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/estacion', this.form);

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Estación Creada',
            text: 'La estación ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Limpiar el formulario
          this.form = {
            nombreEstacion: '',
            descripcionEstacion: '',
            ubicacionEstacion: '',
            estadoEstacion: ''
          };

          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear la estación.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear la estación:', error);
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

<style scoped src="@/assets/styles/estacionMetro/estacionMetroNew.css"></style>
