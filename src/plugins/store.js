import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songs: [],
  },
  actions: {
    SAVE_SONGS(state, songs) {
      songs.forEach((song) => state.commit('ADD_SONG', song));
    },
  },
  mutations: {
    ADD_SONG(state, song) {
      state.songs.push(song);
    },
  },
  getters: {
    ALL_SONGS(state) {
      return state.songs;
    },
  },
});
