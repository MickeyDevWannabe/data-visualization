<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-progress-circular
      v-if="loading"
      :indeterminate="loading"
    />
    <v-list v-else>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
      >
        <v-col>
          <v-avatar
            v-if="avatar"
            color="primary"
            size="48"
          >
            {{ index + 1 }}
          </v-avatar>
          {{ item.code }}
        </v-col>
        <v-col>{{ item.value }}</v-col>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'RankCard',
  props: {
    avatar: Boolean,
    label: String,
    loading: Boolean,
    items: {
      default: () => [],
      type: Array,
    },
    title: String,
  },
};
</script>
