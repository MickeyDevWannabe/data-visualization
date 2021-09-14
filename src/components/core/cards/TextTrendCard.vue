<template>
  <v-card class="rounded-lg pa-0">
    <v-slide-y-transition>
      <v-row
        v-show="isVisible"
        class="justify-center ma-2"
      >
        <div
          class="col-5 d-flex flex-column justify-center pl-4"
          style="min-width: 95px;"
        >
          <p class="mb-0">
            {{ text }}
            <v-icon
              v-if="isUpwardTrend"
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
          <p class="font-weight-bold mb-0 text-h5">{{ values[values.length - 1].toFixed(3) }}</p>
        </div>
        <div
          class="col-6 d-flex flex-column justify-center"
          style="min-width: 95px;"
        >
          <v-sparkline
            auto-draw
            radius="10"
            lineCap="round"
            color="#b8f2e6"
            smooth
            :value="values"
          />
        </div>
      </v-row>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  name: 'TextTrendCard',
  props: {
    isUpwardTrend: Boolean,
    text: String,
    values: {
      default: () => [],
      type: Array,
    },
  },
  data: () => ({
    isVisible: true,
  }),
  watch: {
    values() {
      this.isVisible = false;
      setTimeout(() => {
        this.isVisible = true;
      }, 200);
    },
  },
};
</script>
