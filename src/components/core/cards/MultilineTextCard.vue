<template>
  <v-card class="rounded-lg">
    <v-card-title v-if="title">{{ title }}</v-card-title>
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
            class="mr-1"
            :color="COLOR_CODES[index]"
            size="40"
          >
            {{ index + 1 }}
          </v-avatar>
          <span class="mx-1">{{ item.code }}</span>
        </v-col>
        <v-col class="text-end">{{ item.value }}</v-col>
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
  data: () => ({
    COLOR_CODES: {
      0: 'success',
      1: 'warning',
      2: 'info',
    },
  }),
};
</script>
