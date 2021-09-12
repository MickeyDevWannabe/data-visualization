<template>
  <v-dialog max-width="300">
    <template v-slot:activator="{ on }">
      <v-btn
        color="secondary"
        dark
        v-on="on"
      >
        {{ text }}
      </v-btn>
    </template>
    <v-date-picker
      :max="max"
      :min="min"
      range
      :value="value"
      @input="onChange"
    />
  </v-dialog>
</template>

<script>
export default {
  name: 'DatepickerDialog',
  props: {
    max: String,
    min: String,
    text: {
      default: 'Open Datepicker',
      type: String,
    },
    value: [String, Array],
  },
  methods: {
    onChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>
