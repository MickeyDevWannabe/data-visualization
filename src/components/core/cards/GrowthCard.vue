<template>
  <v-card class="rounded-lg pa-0">
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-list>
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
          <p class="mb-0">
            {{ item.code }}
            <v-icon
              v-if="item.value > 0"
              color="green"
            >
              mdi-arrow-top-right
            </v-icon>
            <v-icon
              v-else
              color="red"
            >
              mdi-arrow-bottom-right
            </v-icon>
          </p>
        </v-col>
        <v-col class="text-right">{{ item.value }}%</v-col>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'GrowthCard',
  props: {
    avatar: Boolean,
    items: {
      default: () => [],
      type: Array,
    },
    title: String,
  },
};
</script>
