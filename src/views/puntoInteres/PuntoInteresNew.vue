<template>
  <Navegation />
  <div class="content">
    <div class="nav">
      <Nav />
    </div>
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nuevo Punto de Interés</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombrePunto" class="form-label">Nombre <span class="required">*</span>:</label>
          <input type="text" id="nombrePunto" v-model="form.nombrePunto" class="form-control" @blur="validateNombrePunto" required>
          <div v-if="errors.nombrePunto" class="error-message">{{ errors.nombrePunto }}</div>
        </div>
        <div class="form-group">
          <label for="descripcionPunto" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="descripcionPunto" v-model="form.descripcionPunto" class="form-control" rows="2" @blur="validateDescripcionPunto" required></textarea>
          <div v-if="errors.descripcionPunto" class="error-message">{{ errors.descripcionPunto }}</div>
        </div>
        <div class="form-group">
          <label for="ubicacionPunto" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacionPunto" v-model="form.ubicacionPunto" class="form-control" @blur="validateUbicacionPunto" required>
          <div v-if="errors.ubicacionPunto" class="error-message">{{ errors.ubicacionPunto }}</div>
        </div>
        <div class="form-group">
          <label for="estadoPunto" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadoPunto" v-model="form.estadoPunto" class="form-control" @blur="validateEstadoPunto" required>
          <div v-if="errors.estadoPunto" class="error-message">{{ errors.estadoPunto }}</div>
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
  name: 'PuntoInteresCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombrePunto: '',
        descripcionPunto: '',
        ubicacionPunto: '',
        estadoPunto: ''
      },
      errors: {
        nombrePunto: null,
        descripcionPunto: null,
        ubicacionPunto: null,
        estadoPunto: null
      }
    };
  },
  methods: {
    validateNombrePunto() {
      if (!this.form.nombrePunto) {
        this.errors.nombrePunto = 'El nombre es obligatorio.';
      } else if (this.form.nombrePunto.length < 5) {
        this.errors.nombrePunto = 'El nombre debe tener al menos 5 caracteres.';
      } else {
        this.errors.nombrePunto = null;
      }
    },
    validateDescripcionPunto() {
      if (!this.form.descripcionPunto) {
        this.errors.descripcionPunto = 'La descripción es obligatoria.';
      } else if (this.form.descripcionPunto.length < 5) {
        this.errors.descripcionPunto = 'La descripción debe tener al menos 5 caracteres.';
      } else {
        this.errors.descripcionPunto = null;
      }
    },
    validateUbicacionPunto() {
      if (!this.form.ubicacionPunto) {
        this.errors.ubicacionPunto = 'La ubicación es obligatoria.';
      } else if (this.form.ubicacionPunto.length < 5) {
        this.errors.ubicacionPunto = 'La ubicación debe tener al menos 5 caracteres.';
      } else {
        this.errors.ubicacionPunto = null;
      }
    },
    validateEstadoPunto() {
      if (!this.form.estadoPunto) {
        this.errors.estadoPunto = 'El estado es obligatorio.';
      } else if (this.form.estadoPunto.length < 5) {
        this.errors.estadoPunto = 'El estado debe tener al menos 5 caracteres.';
      } else {
        this.errors.estadoPunto = null;
      }
    },
    validateForm() {
      this.validateNombrePunto();
      this.validateDescripcionPunto();
      this.validateUbicacionPunto();
      this.validateEstadoPunto();

      return !this.errors.nombrePunto && !this.errors.descripcionPunto && !this.errors.ubicacionPunto && !this.errors.estadoPunto;
    },
    async submitForm() {
  
      if (this.validateForm()) {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/puntoInteres', this.form);

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Punto de Interés Creado',
            text: 'El punto de interés ha sido creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Limpiar el formulario
          this.form = {
            nombrePunto: '',
            descripcionPunto: '',
            ubicacionPunto: '',
            estadoPunto: ''
          };

          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear el punto de interés.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear el punto de interés:', error);
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

<style scoped>
/* Estilos generales para pantallas normales */
.nav {
  width: 100%;
}

/* Estilos específicos para pantallas pequeñas (responsive) */
@media (max-width: 768px) {
  .nav {
    position: fixed; /* Fijar en la parte superior */
    top: -9%; /* Alineado al principio de la página */
    left: 63%; /* Centrando horizontalmente */
    transform: translateX(-50%); /* Ajusta el centro */
    width: 100%;
    max-width: 600px; /* Limitar el ancho máximo */
    z-index: 10; /* Asegura que esté encima del contenido */

    padding: 1px; /* Ajusta el padding si es necesario */
  }

  .content {
    margin-top: 80px; /* Añadir espacio suficiente en la parte superior para el nav */
    position: relative;
  }
}
</style>

<style scoped src="@/assets/styles/puntoInteres/puntoInteresNew.css"></style>