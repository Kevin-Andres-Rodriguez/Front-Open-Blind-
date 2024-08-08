<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo">
        <h1>Crear Nuevo Mensaje Personalizado</h1>
      </div>
      <br>
      <form @submit.prevent="submitForm" class="form" novalidate>
        <div class="form-group">
          <label for="mensaje" class="form-label">Mensaje <span class="required">*</span>:</label>
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            class="form-control"
            rows="2"
            required
          ></textarea>
          <span v-if="errors.mensaje" class="error-message">{{ errors.mensaje }}</span>
        </div>
        <div class="form-group">
          <label for="contactoMensaje" class="form-label">Contacto <span class="required">*</span>:</label>
          <input
            type="text"
            id="contactoMensaje"
            v-model="form.contactoMensaje"
            class="form-control"
            required
          />
          <span v-if="errors.contactoMensaje" class="error-message">{{ errors.contactoMensaje }}</span>
        </div>
        <div class="form-group">
          <label for="estadoMensaje" class="form-label">Estado <span class="required">*</span>:</label>
          <input
            type="text"
            id="estadoMensaje"
            v-model="form.estadoMensaje"
            class="form-control"
            required
          />
          <span v-if="errors.estadoMensaje" class="error-message">{{ errors.estadoMensaje }}</span>
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
  name: 'MensajePersonalizadoCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        mensaje: '',
        contactoMensaje: '',
        estadoMensaje: ''
      },
      errors: {
        mensaje: null,
        contactoMensaje: null,
        estadoMensaje: null
      }
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        mensaje: null,
        contactoMensaje: null,
        estadoMensaje: null
      };

      if (!this.form.mensaje) {
        this.errors.mensaje = 'El mensaje es obligatorio.';
        isValid = false;
      }
      if (!this.form.contactoMensaje) {
        this.errors.contactoMensaje = 'El contacto es obligatorio.';
        isValid = false;
      }
      if (!this.form.estadoMensaje) {
        this.errors.estadoMensaje = 'El estado es obligatorio.';
        isValid = false;
      }

      return isValid;
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/mensajePersonalizado', this.form);

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Mensaje Personalizado Creado',
            text: 'El mensaje personalizado ha sido creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Limpiar el formulario
          this.form = {
            mensaje: '',
            contactoMensaje: '',
            estadoMensaje: ''
          };

          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear el mensaje personalizado.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear el mensaje personalizado:', error);
        }
      } else {
        // Mostrar un mensaje si hay errores en el formulario
        Swal.fire({
          title: 'Error de Validación',
          text: 'Por favor, corrige los errores en el formulario.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    }
  }
};
</script>

<style scoped src="@/assets/styles/mensajePersonalizado/mensajePersonalizadoNew.css"></style>