<template>
  <v-card
    ref="chart"
    style="height: 400px;"
  />
</template>

<script>
import highcharts from 'highcharts';

export default {
  name: 'Chart',

  props: {
    categories: {
      default: () => [],
      type: Array,
    },
    title: String,
    yAxisTitle: String,
    series: {
      default: () => [],
      type: Array,
    },
  },

  methods: {
    renderChart() {
      highcharts.chart(this.$refs.chart.$el, {
        chart: {
          backgroundColor: this.$vuetify.theme.themes.dark.backgroundSub,
          type: 'column',
        },
        title: {
          text: this.title,
        },
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          title: {
            text: this.yAxisTitle,
          },
        },
        series: this.series,
      });
    },
  },

  mounted() {
    this.renderChart();
  },

  watch: {
    series() {
      this.renderChart();
    },
  },
};
</script>
