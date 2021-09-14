import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      dark: {
        primary: '#9155fd',
        secondary: '#8a8d93',
        accent: '#0d6efd',
        error: '#ff4c51',
        warning: '#ffb400',
        info: '#16b1ff',
        success: '#56ca00',
        backgroundBase: '#28243d',
        backgroundSub: '#312d4b',
      },
    },
  },
});
