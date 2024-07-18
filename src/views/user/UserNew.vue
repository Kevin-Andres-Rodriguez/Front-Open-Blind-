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
 
 
 <style scoped src="@/assets/styles/User/UserNew.css"></style>