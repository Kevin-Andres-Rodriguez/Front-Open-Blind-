<template>
    <Navegation />
    
    <div class="content">
      <Nav />

    <div class="info-container">
      <p>
        Es un proyecto integral que utiliza tecnología de localización y guías de voz para asistir a personas con discapacidad visual en su navegación diaria utilizando el metro de Quito. La estructura de la base de datos está diseñada para manejar información detallada sobre usuarios, estaciones de metro, puntos de interés, rutas y mensajes personalizados, asegurando que los usuarios reciban la guía necesaria de manera eficiente y accesible.
      </p>
    </div>
    <div class="map-container">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27990657607!2d-74.25986527855468!3d40.697670063015096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2451a1b57a25d%3A0x6e3f4b2f7f8f5bb1!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1604296787341!5m2!1sen!2s" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        aria-hidden="false" 
        tabindex="0">
      </iframe>
    </div>
    <div class="calendar-container">
      <h2>Calendar</h2>
      <div class="calendar">
        <div class="calendar-header">
          <span class="month">July 2024</span>
          <div class="days">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
        </div>
        <div class="dates">
          <span></span> 
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
          <span>18</span>
          <span>19</span>
          <span>20</span>
          <span>21</span>
          <span>22</span>
          <span>23</span>
          <span>24</span>
          <span>25</span>
          <span>26</span>
          <span>27</span>
          <span>28</span>
          <span>29</span>
          <span>30</span>
          <span>31</span>
        </div>
      </div>
    </div>
    <div class="recent-users-container">
      <h2>Usuarios Recientes</h2>
      <div class="user-card" v-for="user in recentUsers" :key="user.id">
        <img :src="user.image" alt="Foto de usuario" class="user-photo"/>
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>{{ user.activityDate }}</p>
        </div>
      </div>
    </div>
  </div>




</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'HomeView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
      recentUsers: [
        { id: 1, name: 'Leo Jacome', activityDate: '24 Jan, 2023', image: '/assets/jugador.png' },
        { id: 2, name: 'Andrea Jiron', activityDate: '24 Jan, 2023', image: '/assets/nina.png' },
        { id: 3, name: 'Nuria Ortiz', activityDate: '23 Jan, 2023', image: '/assets/nina.png' },
        { id: 4, name: 'Andres Gaona', activityDate: '21 Jan, 2023', image: '/assets/jugador.png' },
      ],
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

.info-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
}

.map-container,
.calendar-container,
.recent-users-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
}

.map-container iframe {
  width: 100%;
  height: 450px;
  border: 0;
  border-radius: 10px;
}

.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 10px;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  width: 100%;
}

.calendar-header .month {
  font-size: 18px;
  margin-bottom: 5px;
}

.calendar-header .days {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.calendar-header .days span {
  width: 14.28%;
  text-align: center;
  font-weight: bold;
}

.dates {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
}

.dates span {
  width: 14.28%;
  text-align: center;
  padding: 5px 0;
  box-sizing: border-box;
}

.user-card {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card .user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-card .user-info {
  text-align: left;
}

.user-card .user-info h3 {
  margin: 0;
  font-size: 16px;
}

.user-card .user-info p {
  margin: 0;
  font-size: 12px;
  color: #6c757d;
}

.header-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.ecuavisa.com/binrepository/867x495/0c0/825d495/none/11705/RRGY/metro-quito-ecuavisa_927558_20230503132851.jpg'); /* Ruta de la imagen */
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* Adjust opacity if needed */
  border-radius: 10px;
  z-index: -1; /* Place it behind the content */
}
</style>








