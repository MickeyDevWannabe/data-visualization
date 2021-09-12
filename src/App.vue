<template>
  <v-app>
    <v-main>
      <Index />
    </v-main>
  </v-app>
</template>

<script>
import Index from './components/index.vue';
import './assets/css/variables.scss';

export default {
  name: 'App',

  components: { Index },

  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
