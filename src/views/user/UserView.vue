<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Usuarios</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar..." v-model="searchQuery" />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Nombres</th>
            <th><i class="fas fa-id-card-alt"></i> Apellidos</th>
            <th><i class="fas fa-at"></i> Correo</th>
            <th><i class="fas fa-phone-alt"></i> Teléfono</th>
            <th><i class="fas fa-birthday-cake"></i> F. Nacimiento</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="8" class="text-center">Sin registros de Usuarios</td>
          </tr>
          <tr v-for="user in filteredUsers" :key="user.usuarioId">
            <td>{{ user.createUser }}</td>
            <td>{{ user.nombreUsuario }}</td>
            <td>{{ user.apellidoUsuario }}</td>
            <td>{{ user.correoUsuario }}</td>
            <td>{{ user.telefonoUsuario }}</td>
            <td>{{ formatDate(user.fechaNacimientoUsuario) }}</td>
            <td
              :class="{
                'status-active': user.estado_usuario,
                'status-inactive': !user.estado_usuario,
              }"
            >
              {{ user.estado_usuario ? "Activo" : "Desactivado" }}
            </td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', user)"></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(user.usuarioId)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>
          {{ filteredUsers.length }} resultados encontrados: Mostrando página 1
          de 100
        </p>
        <button class="add-btn" @click="redirectToCreateUsuario">
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
            <label for="nombreUsuario" class="form-label"
              >Nombres <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="nombreUsuario"
              v-model="form.nombreUsuario"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidoUsuario" class="form-label"
              >Apellidos <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="apellidoUsuario"
              v-model="form.apellidoUsuario"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="correoUsuario" class="form-label"
              >Email <span class="required">*</span>:</label
            >
            <input
              type="email"
              id="correoUsuario"
              v-model="form.correoUsuario"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="telefonoUsuario" class="form-label"
              >Teléfono <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="telefonoUsuario"
              v-model="form.telefonoUsuario"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="fechaNacimientoUsuario" class="form-label"
              >Fecha de Nacimiento <span class="required">*</span>:</label
            >
            <input
              type="date"
              id="fechaNacimientoUsuario"
              v-model="form.fechaNacimientoUsuario"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estado_usuario" class="form-label"
              >Estado <span class="required">*</span>:</label
            >
            <label class="switch">
              <input
                type="checkbox"
                id="estado_usuario"
                v-model="form.estado_usuario"
              />
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
import Nav from "@/components/Nav.vue";
import Navegation from "@/components/Navegation.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "UsuariosView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      users: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        usuarioId: null,
        nombreUsuario: "",
        apellidoUsuario: "",
        correoUsuario: "",
        telefonoUsuario: "",
        fechaNacimientoUsuario: "",
        estado_usuario: false,
        createUser: "",
      },
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.users.filter(
        (user) =>
          user.nombreUsuario.toLowerCase().includes(query) ||
          user.apellidoUsuario.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4200/usuario");
        this.users = response.data;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    openOffCanvas(action, user = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Usuario";
        this.form = { ...user };
        // Asegúrate de que la fecha de nacimiento esté en formato YYYY-MM-DD
        this.form.fechaNacimientoUsuario = user.fechaNacimientoUsuario
          ? new Date(user.fechaNacimientoUsuario).toISOString().split("T")[0]
          : "";
        this.isOffCanvasOpen = true;
      } else if (action === "create") {
        this.offCanvasTitle = "Agregar Usuario";
        this.form = {
          usuarioId: null,
          nombreUsuario: "",
          apellidoUsuario: "",
          correoUsuario: "",
          telefonoUsuario: "",
          fechaNacimientoUsuario: "",
          estado_usuario: false,
          createUser: "",
        };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toISOString().split("T")[0];
    },
    async submitForm() {
      try {
        if (this.form.usuarioId) {
          // Actualizar un usuario existente
          await axios.put(
            `http://localhost:4200/usuario/${this.form.usuarioId}`,
            this.form
          );
          const index = this.users.findIndex(
            (u) => u.usuarioId === this.form.usuarioId
          );
          if (index !== -1) {
            this.users[index] = { ...this.form };
            Swal.fire(
              "¡Actualizado!",
              "El usuario ha sido actualizado.",
              "success"
            );
          }
        } else {
          // Crear un nuevo usuario
          await axios.post("http://localhost:4200/usuario", this.form);
          this.users.push({ ...this.form, usuarioId: Date.now() }); // Simula un ID generado
          Swal.fire(
            "¡Registrado!",
            "El usuario ha sido registrado.",
            "success"
          );
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al guardar el usuario.", "error");
        console.error("Error al guardar el usuario:", error);
      }
    },
    redirectToCreateUsuario() {
      this.$router.push("/register");
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped src="@/assets/styles/User/UserView.css"></style>
