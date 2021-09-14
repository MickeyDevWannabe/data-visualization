<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="nav-header d-flex items-center pl-6 pt-5 pb-2">
      <v-icon color="primary">{{ icons.mdiCurrencyUsd }}</v-icon>
      <h2 class="app-title text--primary">
        Currency app
      </h2>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-link
        title="Dashboard"
        to="#"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Account Settings"
        to="#"
        :icon="icons.mdiAccountCogOutline"
      ></nav-menu-link>
      <nav-menu-group
        title="Pages"
        :icon="icons.mdiFileOutline"
      >
        <nav-menu-link
          title="Login"
          to="#"
          target="_blank"
        ></nav-menu-link>
        <nav-menu-link
          title="Register"
          to="#"
          target="_blank"
        ></nav-menu-link>
      </nav-menu-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiCurrencyUsd,
} from '@mdi/js';
import NavMenuGroup from './components/NavMenuGroup.vue';
import NavMenuLink from './components/NavMenuLink.vue';

export default {
  components: {
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiCurrencyUsd,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
  .app-title {
    font-size: 1.5rem;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
  }

  .app-logo {
    transition: all 0.18s ease-in-out;

    .v-navigation-drawer--mini-variant & {
      transform: translateX(-4px);
    }
  }

  .app-navigation-menu {
    box-shadow: 0 0 5px -2px #888;
    .v-list-item {
      &.vertical-nav-menu-link {
        ::v-deep .v-list-item__icon {
          .v-icon {
            transition: none !important;
          }
        }
      }
    }
  }
</style>
