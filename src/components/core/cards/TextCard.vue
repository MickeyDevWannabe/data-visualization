<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-progress-circular
      v-if="loading"
      :indeterminate="loading"
    />
    <v-card-text v-else>
      <v-row>
        <v-col v-if="label">{{ label }}</v-col>
        <v-col v-if="text">{{ text }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TextCard',
  props: {
    label: String,
    loading: Boolean,
    text: [Number, String],
    title: String,
  },
};
</script>
