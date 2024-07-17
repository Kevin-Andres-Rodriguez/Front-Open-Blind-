<template>

  <div class="content">
    <div class="header-container">
      <h1>OpenBlind</h1>
      <div class="dropdown" @click="toggleDropdown">
        <div class="user-info">
          <span>{{ username }}</span>
          <img :src="userImage" alt="User Image">
        </div>
        <div v-if="isOpen" class="dropdown-content">
          <router-link to="/create/User">Usuario</router-link>
          <router-link to="/">Logout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    }
  },
};
</script>

<style scoped>
.content {
  margin-left: 20px;
  padding: 15px;
  width: calc(100% - 220px);
}

.header-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 77vw; /* Ajuste para que ocupe todo el ancho de la ventana */
  right: 10px;
}

.header-container h1 {
  margin: 0;
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info span {
  margin-right: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 10px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
