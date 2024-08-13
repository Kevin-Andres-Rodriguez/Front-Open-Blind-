<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Estación de Metro</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar..." />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-subway"></i> Nombre de la estación</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEstaciones.length === 0">
            <td colspan="6" class="text-center">
              Sin registros de Estación de Metro
            </td>
          </tr>
          <tr v-for="estacion in filteredEstaciones" :key="estacion.estacionId">
            <td dat-label="Fecha">{{ estacion.createEstacion }}</td>
            <td dat-label="Nombre de la Estación">
              {{ estacion.nombreEstacion }}
            </td>
            <td dat-label="Descripción">{{ estacion.descripcionEstacion }}</td>
            <td dat-label="Ubicación">{{ estacion.ubicacionEstacion }}</td>
            <td dat-label="Estado">{{ estacion.estadoEstacion }}</td>
            <td class="actions">
              <i
                class="fas fa-edit"
                @click="openOffCanvas('edit', estacion)"
              ></i>
              <i
                class="fas fa-trash-alt"
                @click="handleDeleteClick(estacion.estacionId)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredEstaciones.length }} resultados encontrados</p>
        <button class="add-btn" @click="redirectToCreateEstacion">
          Agregar
        </button>
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
            <label for="nombre_estacion" class="form-label"
              >Nombre de la estación <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="nombre_estacion"
              v-model="form.nombreEstacion"
              class="form-control"
              @blur="validateNombreEstacion"
              required
            />
            <div v-if="errors.nombreEstacion" class="error-message">
              {{ errors.nombreEstacion }}
            </div>
          </div>
          <div class="form-group">
            <label for="descripcion_estacion" class="form-label"
              >Descripción <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="descripcion_estacion"
              v-model="form.descripcionEstacion"
              class="form-control"
              @blur="validateDescripcionEstacion"
              required
            />
            <div v-if="errors.descripcionEstacion" class="error-message">
              {{ errors.descripcionEstacion }}
            </div>
          </div>
          <div class="form-group">
            <label for="ubicacion_estacion" class="form-label"
              >Ubicación <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="ubicacion_estacion"
              v-model="form.ubicacionEstacion"
              class="form-control"
              @blur="validateUbicacionEstacion"
              required
            />
            <div v-if="errors.ubicacionEstacion" class="error-message">
              {{ errors.ubicacionEstacion }}
            </div>
          </div>
          <div class="form-group">
            <label for="estado_estacion" class="form-label"
              >Estado <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estado_estacion"
              v-model="form.estadoEstacion"
              class="form-control"
              @blur="validateEstadoEstacion"
              required
            />
            <div v-if="errors.estadoEstacion" class="error-message">
              {{ errors.estadoEstacion }}
            </div>
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
import Nav from "@/components/Nav.vue";
import Navegation from "@/components/Navegation.vue";
import Swal from "sweetalert2";
import axios from "axios"; // Aquí está el import correcto

export default {
  name: "EstacionMetroView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      estaciones: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        estacionId: null,
        nombreEstacion: "",
        descripcionEstacion: "",
        ubicacionEstacion: "",
        estadoEstacion: "",
      },
      errors: {
        nombreEstacion: null,
        descripcionEstacion: null,
        ubicacionEstacion: null,
        estadoEstacion: null,
      },
    };
  },
  computed: {
    filteredEstaciones() {
      if (!this.searchQuery) {
        return this.estaciones;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.estaciones.filter((estacion) =>
        estacion.nombreEstacion.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchEstaciones() {
      try {
        const response = await axios.get("http://localhost:4200/estacion");
        this.estaciones = response.data;
      } catch (error) {
        console.error("Error al obtener las estaciones:", error);
      }
    },
    openOffCanvas(action, estacion = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Estación";
        this.form = { ...estacion };
        this.isOffCanvasOpen = true;
      } else if (action === "add") {
        this.offCanvasTitle = "Agregar Estación";
        this.form = {
          estacionId: null,
          nombreEstacion: "",
          descripcionEstacion: "",
          ubicacionEstacion: "",
          estadoEstacion: "",
        };
        this.errors = {}; // Reset errors
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    // Función eliminar

    async handleDeleteClick(estacionId) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:4200/estacion/${estacionId}`);
            this.estaciones = this.estaciones.filter(
              (estacion) => estacion.estacionId !== estacionId
            );
            Swal.fire("¡Borrado!", "La estación ha sido borrada.", "success");
          } catch (error) {
            Swal.fire("Error", "Hubo un error al borrar la estación.", "error");
            console.error("Error al borrar la estación:", error);
          }
        }
      });
    },

    validateNombreEstacion() {
      if (!this.form.nombreEstacion) {
        this.errors.nombreEstacion = "El nombre de la estación es obligatorio.";
      } else if (this.form.nombreEstacion.length < 5) {
        this.errors.nombreEstacion =
          "El nombre debe tener al menos 5 caracteres.";
      } else {
        this.errors.nombreEstacion = null;
      }
    },
    validateDescripcionEstacion() {
      if (!this.form.descripcionEstacion) {
        this.errors.descripcionEstacion = "La descripción es obligatoria.";
      } else if (this.form.descripcionEstacion.length < 5) {
        this.errors.descripcionEstacion =
          "La descripción debe tener al menos 5 caracteres.";
      } else {
        this.errors.descripcionEstacion = null;
      }
    },
    validateUbicacionEstacion() {
      if (!this.form.ubicacionEstacion) {
        this.errors.ubicacionEstacion = "La ubicación es obligatoria.";
      } else if (this.form.ubicacionEstacion.length < 5) {
        this.errors.ubicacionEstacion =
          "La ubicación debe tener al menos 5 caracteres.";
      } else {
        this.errors.ubicacionEstacion = null;
      }
    },
    validateEstadoEstacion() {
      if (!this.form.estadoEstacion) {
        this.errors.estadoEstacion = "El estado es obligatorio.";
      } else if (this.form.estadoEstacion.length < 5) {
        this.errors.estadoEstacion =
          "El estado debe tener al menos 5 caracteres.";
      } else {
        this.errors.estadoEstacion = null;
      }
    },
    validateForm() {
      this.validateNombreEstacion();
      this.validateDescripcionEstacion();
      this.validateUbicacionEstacion();
      this.validateEstadoEstacion();

      return (
        !this.errors.nombreEstacion &&
        !this.errors.descripcionEstacion &&
        !this.errors.ubicacionEstacion &&
        !this.errors.estadoEstacion
      );
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          if (this.form.estacionId) {
            // Actualizar una estación existente
            await axios.put(
              `http://localhost:4200/estacion/${this.form.estacionId}`,
              this.form
            );
            const index = this.estaciones.findIndex(
              (e) => e.estacionId === this.form.estacionId
            );
            if (index !== -1) {
              this.estaciones[index] = { ...this.form };
              Swal.fire(
                "¡Actualizado!",
                "La estación ha sido actualizada.",
                "success"
              );
            }
          } else {
            // Crear una nueva estación
            const response = await axios.post(
              "http://localhost:4200/estacion",
              this.form
            );
            this.estaciones.push(response.data);
            Swal.fire("¡Creado!", "La estación ha sido creada.", "success");
          }
          this.closeOffCanvas();
        } catch (error) {
          Swal.fire("Error", "Hubo un error al guardar la estación.", "error");
          console.error("Error al guardar la estación:", error);
        }
      } else {
        Swal.fire(
          "Error",
          "Por favor, corrija los errores en el formulario antes de enviarlo.",
          "error"
        );
      }
    },
    redirectToCreateEstacion() {
      this.$router.push("/create/EstacionMetro");
    },
  },
  mounted() {
    this.fetchEstaciones();
  },
};
</script>
<style scoped src="@/assets/styles/estacionMetro/estacionMetro.css"></style>
