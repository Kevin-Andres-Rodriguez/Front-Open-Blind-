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
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-user"></i> Nombres</th>
            <th><i class="fas fa-id-card-alt"></i> Apellidos</th>
            <th><i class="fas fa-at"></i> Correo</th>
            <th><i class="fas fa-phone-alt"></i> Teléfono</th>
            <th><i class="fas fa-birthday-cake"></i> F.Nacimiento</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="8" class="text-center">Sin registros de Usuarios</td>
          </tr>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.date }}</td>
            <td>{{ user.nombreUsuario }}</td>
            <td>{{ user.apellidoUsuario }}</td>
            <td>{{ user.correoUsuario }}</td>
            <td>{{ user.telefonoUsuario }}</td>
            <td>{{ user.fechaNacimientoUsuario }}</td>
            <td>{{ user.estado_usuario }}</td>
            <td :class="{'status-active': user.estado_usuario === 'Activo', 'status-inactive': user.estado_usuario === 'Desactivado'}">
              <i class="fas fa-edit" @click="openOffCanvas('edit', user)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredUsers.length }} resultados encontrados: Mostrando página 1 de 100</p>
        <button class="add-btn" @click="redirectToCreateUsuario">Agregar</button>
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
            <label for="nombreUsuario" class="form-label">Nombres <span class="required">*</span>:</label>
            <input type="text" id="nombreUsuario" v-model="form.nombreUsuario" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="apellidoUsuario" class="form-label">Apellidos <span class="required">*</span>:</label>
            <input type="text" id="apellidoUsuario" v-model="form.apellidoUsuario" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="correoUsuario" class="form-label">Email <span class="required">*</span>:</label>
            <input type="email" id="correoUsuario" v-model="form.correoUsuario" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="telefonoUsuario" class="form-label">Teléfono <span class="required">*</span>:</label>
            <input type="text" id="telefonoUsuario" v-model="form.telefonoUsuario" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="fechaNacimientoUsuario" class="form-label">Fecha de Nacimiento <span class="required">*</span>:</label>
            <input type="date" id="fechaNacimientoUsuario" v-model="form.fechaNacimientoUsuario" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="estado_usuario" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estado_usuario" />
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
  name: "UserView",
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
        telefonoUsuario: "",
        correoUsuario: "",
        fechaNacimientoUsuario: "",
        estado_usuario: "Desactivado", // Valor predeterminado como texto
      },
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.users.filter(
        (user) =>
          user.nombreUsuario.toLowerCase().includes(query) ||
          user.apellidoUsuario.toLowerCase().includes(query) ||
          user.correoUsuario.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4200/usuario");
        this.users = response.data.map(user => ({
          ...user,
          estado_usuario: user.estado_usuario === 1 ? "Activo" : "Desactivado" // Convertir estado al texto
        }));
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    formatDateForInput(date) {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    openOffCanvas(action, user = null) {
      this.offCanvasTitle = action === "add" ? "Agregar Usuario" : "Editar Usuario";
      if (action === "edit" && user) {
        this.form = {
          usuarioId: user.usuarioId,
          nombreUsuario:  user.nombreUsuario,
          apellidoUsuario: user.apellidoUsuario,
          telefonoUsuario: user.telefonoUsuario,
          correoUsuario: user.correoUsuario,
          fechaNacimientoUsuario: this.formatDateForInput(user.fechaNacimientoUsuario),
          estado_usuario: user.estado_usuario, // Mantener como texto
        };
      } else {
        this.form = {
          usuarioId: null,
          nombreUsuario: "",
          apellidoUsuario: "",
          telefonoUsuario: "",
          correoUsuario: "",
          fechaNacimientoUsuario: "",
          estado_usuario: "Desactivado", // Valor predeterminado como texto
        };
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async handleDeleteClick(usuarioId) {
      try {
        await Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará el usuario.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });
        await axios.delete(`http://localhost:4200/usuario/${usuarioId}`);
        this.users = this.users.filter((user) => user.usuarioId !== usuarioId);
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un error al eliminar el usuario.", "error");
        console.error("Error al eliminar el usuario:", error);
      }
    },
    async submitForm() {
      try {
        if (this.form.usuarioId) {
          await axios.put(`http://localhost:4200/usuario/${this.form.usuarioId}`, {
            ...this.form,
            estado_usuario: this.form.estado_usuario === "Activo" ? 1 : 0 // Convertir estado a número
          });
          const index = this.users.findIndex((user) => user.usuarioId === this.form.usuarioId);
          if (index !== -1) {
            this.users[index] = { ...this.form, estado_usuario: this.form.estado_usuario };
          }
          Swal.fire("¡Actualizado!", "El usuario ha sido actualizado.", "success");
        } else {
          await axios.post("http://localhost:4200/usuario", {
            ...this.form,
            estado_usuario: this.form.estado_usuario === "Activo" ? 1 : 0 // Convertir estado a número
          });
          this.users.push({ ...this.form, usuarioId: Date.now(), date: new Date().toLocaleDateString() });
          Swal.fire("¡Guardado!", "El usuario ha sido agregado.", "success");
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al guardar los datos.", "error");
        console.error("Error al guardar los datos:", error);
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