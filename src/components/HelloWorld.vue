<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>

        Song list: {{ songList }}
        <button @click="fetchSongs">FETCH SONGS</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  computed: {
    songList() {
      return this.$store.getters.ALL_SONGS;
    },
  },

  methods: {
    async fetchSongs() {
      try {
        const res = await this.$http.get('https://openwhyd.org/adrien?format=json');
        await this.$store.dispatch('SAVE_SONGS', res.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
  },
};
</script>
