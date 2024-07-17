<template>
   <Navegation />
  <div class="content">
    <Nav />

      <div class="profile">
        <h2>Administrador Información</h2>
        <div class="profile-info">
          <div class="profile-picture">
            <img src="https://via.placeholder.com/100" alt="Profile Picture" />
          </div>
          <div class="profile-details">
            <p>Uroos Fatima</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            <p>Email: uroos.desing@gmail.com</p>
            <p>Phone Number: +91 654852524</p>
            <p>Address: Quito, 12 de diciembre y roca</p>
          </div>
        </div>
        <div class="additional-info">
          <div class="info-item">
            <span>Nombre</span>
            <p>Fatima</p>
          </div>
          <div class="info-item">
            <span>Apellido</span>
            <p>Uroos</p>
          </div>
          <div class="info-item">
            <span>Teléfono</span>
            <p>0988595952</p>
          </div>
          <div class="info-item">
            <span>Email</span>
            <p>uroos.desing@gmail.com</p>
          </div>
          <div class="info-item">
            <span>Estado</span>
            <p>Activo</p>
          </div>
          <div class="info-item">
            <span>F. Nacimiento</span>
            <p>1999-05-26</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

  export default {
    name: 'UserEdit',
    components: {
      Navegation,
      Nav
    },
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
    },
  };
</script>


<style scoped>
  
.content {
margin-left: 20px;
padding: 15px;
width: calc(100% - 220px);
}



.profile {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

.profile h2 {
  margin-bottom: 20px;
  font-size: 22px;
}

.profile-info {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-picture img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.profile-details p {
  margin: 5px 0;
  font-size: 16px;
  line-height: 1.5;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.info-item {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.info-item span {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}

.info-item:nth-child(1) span {
  background-color: #ff9800;
}

.info-item:nth-child(2) span {
  background-color: #ff9800;
}

.info-item:nth-child(3) span {
  background-color: #4caf50;
}

.info-item:nth-child(4) span {
  background-color: #4caf50;
}

.info-item:nth-child(5) span {
  background-color: #f44336;
}

.info-item:nth-child(6) span {
  background-color: #e91e63;
}
</style>