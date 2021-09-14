import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './plugins/store';
// import gchart from './plugins/google-charts';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  // gchart,
  render: (h) => h(App),
}).$mount('#app');
