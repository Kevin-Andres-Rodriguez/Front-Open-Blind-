<template>
  <Navegation />
<div>
  <Nav />
  <h1>Estación de Metro - View</h1>
  <!-- Aquí puedes agregar el resto del contenido de tu vista -->
</div>

</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
name: 'EstacionMetroView',
components: {
  Navegation,
  Nav

}
}
</script>

