<template>
  <g-chart
    type="LineChart"
    :data="values"
    :options="chartOptions"
  />
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  name: 'GoogleChart',
  components: {
    // eslint-disable-next-line
    GChart,
  },
  props: {
    values: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      chartOptions: {
        width: 800,
        height: 600,
        backgroundColor: '#312d4b',
        legend: {
          textStyle: {
            color: 'white',
          },
        },
        series: {
          0: { color: '#3ea26c' },
          1: { color: '#46789a' },
          2: { color: '#b372cc' },
        },
        hAxis: {
          gridlines: {
            color: '#3b384e',
          },
          textStyle: {
            color: 'white',
          },
        },
        vAxis: {
          gridlines: {
            color: '#3b384e',
          },
          textStyle: {
            color: 'white',
          },
        },
      },
    };
  },
};
</script>
