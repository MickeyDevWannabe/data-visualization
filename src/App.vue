<template>
  <v-app>
    <sidebar />
    <v-main>
<!--      <Index />-->
      <New />
    </v-main>
  </v-app>
</template>

<script>
// import Index from './components/index.vue';
import New from './components/new.vue';
import './assets/css/variables.scss';
import Sidebar from './components/layout/nav/Sidebar.vue';

export default {
  name: 'App',

  components: {
    Sidebar,
    // Index,
    New,
  },

  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
