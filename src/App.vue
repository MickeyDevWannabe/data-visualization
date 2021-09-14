<template>
  <v-app>
    <sidebar />
    <v-main>
      <Index />
    </v-main>
  </v-app>
</template>

<script>
import Index from './components/index.vue';
import './assets/css/variables.scss';
import Sidebar from './components/layout/nav/Sidebar.vue';

export default {
  name: 'App',

  components: {
    Sidebar,
    Index,
  },

  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
