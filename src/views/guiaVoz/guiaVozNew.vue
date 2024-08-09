<template>
  <Navegation />
  <div class="content">
    <div class="nav">
      <Nav />

    </div>

    <div class="form-container">
      <br>
      <div class="titulo">
        <h1>Crear Nueva Guía de Voz</h1>
      </div>
      <br>
      <form @submit.prevent="submitForm" class="form" novalidate>
        <div class="form-group">
          <label for="descripcionGuiaVoz" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea
            id="descripcionGuiaVoz"
            v-model="form.descripcionGuiaVoz"
            class="form-control"
            rows="2"
            required
            minlength="10"
            maxlength="200"
          ></textarea>
          <span v-if="errors.descripcionGuiaVoz" class="error-message">{{ errors.descripcionGuiaVoz }}</span>
        </div>
        <div class="form-group">
          <label for="audioUrlGuiaVoz" class="form-label">Audio URL <span class="required">*</span>:</label>
          <input
            type="url"
            id="audioUrlGuiaVoz"
            v-model="form.audioUrlGuiaVoz"
            class="form-control"
            required
            pattern="https?://.+"
          />
          <span v-if="errors.audioUrlGuiaVoz" class="error-message">{{ errors.audioUrlGuiaVoz }}</span>
        </div>
        <div class="form-group">
          <label for="idiomaGuiaVoz" class="form-label">Idioma <span class="required">*</span>:</label>
          <input
            type="text"
            id="idiomaGuiaVoz"
            v-model="form.idiomaGuiaVoz"
            class="form-control"
            required
            pattern="[A-Za-z]{2,}"
          />
          <span v-if="errors.idiomaGuiaVoz" class="error-message">{{ errors.idiomaGuiaVoz }}</span>
        </div>
        <div class="form-group">
          <label for="estadoGuiaVoz" class="form-label">Estado <span class="required">*</span>:</label>
          <input
            type="text"
            id="estadoGuiaVoz"
            v-model="form.estadoGuiaVoz"
            class="form-control"
            required
            pattern="(Defina su Estado)"
          />
          <span v-if="errors.estadoGuiaVoz" class="error-message">{{ errors.estadoGuiaVoz }}</span>
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
import axios from 'axios';

export default {
  name: 'GuiaVozCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        descripcionGuiaVoz: '',
        audioUrlGuiaVoz: '',
        idiomaGuiaVoz: '',
        estadoGuiaVoz: ''
      },
      errors: {}
    };
  },
  methods: {
    async submitForm() {
      if (this.validateForm()) {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/guiaVoz', this.form);

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Guía de Voz Creada',
            text: 'La guía de voz ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Limpiar el formulario
          this.form = {
            descripcionGuiaVoz: '',
            audioUrlGuiaVoz: '',
            idiomaGuiaVoz: '',
            estadoGuiaVoz: ''
          };

          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear la guía de voz.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear la guía de voz:', error);
        }
      }
    },
    validateForm() {
      this.errors = {};

      if (this.form.descripcionGuiaVoz.length < 10) {
        this.errors.descripcionGuiaVoz = 'La descripción debe tener al menos 10 caracteres.';
      } else if (this.form.descripcionGuiaVoz.length > 200) {
        this.errors.descripcionGuiaVoz = 'La descripción no puede exceder los 200 caracteres.';
      }

      if (!this.isValidUrl(this.form.audioUrlGuiaVoz)) {
        this.errors.audioUrlGuiaVoz = 'Ingrese una URL válida.';
      }

      if (!this.form.idiomaGuiaVoz.match(/[A-Za-z]{2,}/)) {
        this.errors.idiomaGuiaVoz = 'El idioma debe ser un texto válido de al menos dos letras.';
      }



      return Object.keys(this.errors).length === 0;
    },
    isValidUrl(url) {
      const pattern = new RegExp('^https?://');
      return pattern.test(url);
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
    left: 65%; /* Centrando horizontalmente */
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
<style scoped src="@/assets/styles/guiaVoz/guiaVozNew.css"></style>