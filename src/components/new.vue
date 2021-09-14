<template>
  <v-container>
    <div>
      <h1 class="ml-2 my-5">Market</h1>
      <v-row class="mx-0 my-2">
        <TextTrendCard
          class="col-3 mr-2"
          :is-upward-trend="isUpwardTrend(
          prepareTrendValues(currencyLifetimeData, randomChartIndices[0]),
        )"
          :text="currencyLifetimeData[randomChartIndices[0]][0].code"
          :values="prepareTrendValues(currencyLifetimeData, randomChartIndices[0])"
        />
        <TextTrendCard
          class="col-3 mr-2"
          :is-upward-trend="isUpwardTrend(
          prepareTrendValues(currencyLifetimeData, randomChartIndices[1]),
        )"
          :text="currencyLifetimeData[randomChartIndices[1]][0].code"
          :values="prepareTrendValues(currencyLifetimeData, randomChartIndices[1])"
        />
        <TextTrendCard
          class="col-3 mr-2"
          :is-upward-trend="isUpwardTrend(
          prepareTrendValues(currencyLifetimeData, randomChartIndices[2]),
        )"
          :text="currencyLifetimeData[randomChartIndices[2]][0].code"
          :values="prepareTrendValues(currencyLifetimeData, randomChartIndices[2])"
        />
      </v-row>
    </div>
    <div class="main-grid">
      <div
        class="d-none d-lg-block span-item"
        style="position: relative;"
      >
        <div class="buttons-on-chart">
          <v-btn @click="changeChartData(3)">3 days</v-btn>
          <v-btn @click="changeChartData(6)">6 days</v-btn>
          <v-btn @click="changeChartData(10)">10 days</v-btn>
          <v-btn @click="changeChartData(15)">15 days</v-btn>
          <v-btn @click="changeChartData(30)">30 days</v-btn>
        </div>
        <v-card
          class="rounded-lg pa-2"
          style="min-width: 800px;"
        >
          <google-chart :values="mappedChartData" />
        </v-card>
      </div>
      <div>
        <h2 class="ml-2 mb-5 mt-2">Top 3 currencies</h2>
        <multiline-text-card
          avatar
          :items="topThreeCurrencies"
        />
      </div>
      <div>
        <h2 class="ml-2 mb-5 mt-2">Growth</h2>
        <growth-card :items="topThreeCurrenciesGrowth" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { NBP, TABLE_TYPES } from '../plugins/nbp';
import GoogleChart from './core/charts/GoogleChart.vue';
import GrowthCard from './core/cards/GrowthCard.vue';
import MultilineTextCard from './core/cards/MultilineTextCard.vue';
import TextTrendCard from './core/cards/TextTrendCard.vue';

export default {
  name: 'new',
  components: {
    GoogleChart, GrowthCard, MultilineTextCard, TextTrendCard,
  },
  data: () => ({
    currencyData: null,
    currencyLifetimeData: null,
    loading: false,
    mappedChartData: [],
    randomChartIndices: [0, 1, 2],
    topCount: 10,
    topThreeIndices: [],
  }),
  mounted() {
    this.fetchExchangeRatesTopCount();
  },
  watch: {
    currencyData(value) {
      if (!value) return;
      this.setCurrencyLifetimeData(value);
      this.setMappedChartData(value);
      this.setTopThreeIndices(value);
    },
  },
  created() {
    setInterval(this.randomizeChartIndices, 5000);
  },
  computed: {
    mappedData() {
      if (!this.currencyData) return [];
      const newestData = this.currencyData[this.currencyData.length - 1];
      const sorted = newestData.rates.sort((a, b) => a.code.localeCompare(b.code));
      return this.prepareRatesOptions(sorted);
    },
    topThreeCurrenciesGrowth() {
      return this.topThreeIndices.reduce((acc, curr) => {
        const data = this.currencyLifetimeData;
        const growth = (data[curr][0].mid / data[curr][data[curr].length - 1].mid) * 100;
        const percentGrowth = (100 - growth).toFixed(2);
        acc.push({ code: data[curr][0].code, value: percentGrowth });
        return acc;
      }, []);
    },
    topThreeCurrencies() {
      if (!this.mappedData.length) return [];
      return this.mappedData
        .reduce((acc, curr) => {
          for (let i = 0; i < acc.length; i += 1) {
            if (acc[i].value < curr.value) {
              acc.splice(i, 1);
              acc.push(curr);
              break;
            }
          }
          return acc;
        }, [this.mappedData[0], this.mappedData[1], this.mappedData[2]])
        .reverse();
    },
  },
  methods: {
    setTopThreeIndices(value) {
      const names = value[0].rates
        .sort((a, b) => a.code.localeCompare(b.code))
        .map((obj) => obj.code);
      this.topThreeIndices = this.topThreeCurrencies.reduce((acc, curr) => {
        const index = names.indexOf(curr.code);
        acc.push(index);
        return acc;
      }, []);
    },
    setMappedChartData(value) {
      const dates = value.reduce((acc, curr) => {
        acc.push(curr.effectiveDate);
        return acc;
      }, []);
      const names = value[0].rates
        .sort((a, b) => a.code.localeCompare(b.code))
        .map((obj) => obj.code);
      const sorted = value.reduce((acc, curr) => {
        const localSorted = curr.rates.sort((a, b) => a.code.localeCompare(b.code));
        acc.push(localSorted.map((ls) => ls.mid));
        return acc;
      }, []);

      const indices = this.topThreeCurrencies.reduce((acc, curr) => {
        const index = names.indexOf(curr.code);
        acc.push(index);
        return acc;
      }, []);

      const chartData = [
        ['Date', names[indices[0]], names[indices[1]], names[indices[2]]],
      ];
      for (let i = 0; i < sorted.length; i += 1) {
        const arr = [dates[i], sorted[i][indices[0]], sorted[i][indices[1]], sorted[i][indices[2]]];
        chartData.push(arr);
      }
      this.mappedChartData = chartData;
    },
    setCurrencyLifetimeData(value) {
      const mergeArray = [];
      value.forEach((data, index) => {
        const sortedArray = data.rates.sort((a, b) => a.code.localeCompare(b.code));
        if (index === 0) {
          mergeArray.push(sortedArray.map((obj) => [obj]));
          return;
        }
        for (let i = 0; i < sortedArray.length; i += 1) {
          mergeArray[0][i].push(sortedArray[i]);
        }
      });
      // eslint-disable-next-line prefer-destructuring
      this.currencyLifetimeData = mergeArray[0];
      return null;
    },
    randomizeChartIndices() {
      this.randomChartIndices = [
        Math.floor(Math.random() * 35),
        Math.floor(Math.random() * 35),
        Math.floor(Math.random() * 35),
      ];
    },
    async changeChartData(topCount) {
      await this.fetchExchangeRatesTopCount(topCount);
      this.randomizeChartIndices();
      this.topCount = topCount;
    },
    isUpwardTrend(values) {
      return values[values.length - 1] > values[values.length - 2];
    },
    prepareTrendValues(values, index) {
      if (!values) return [];
      return values[index].map((obj) => obj.mid);
    },
    prepareRatesOptions(options) {
      return options.map((obj) => ({
        code: obj.code,
        value: obj.mid,
      }));
    },
    async fetchExchangeRates() {
      const nbp = new NBP();
      const response = await nbp.exchangeRatesGeneralPeriod(
        TABLE_TYPES.A,
        this.viewPeriod[0],
        this.viewPeriod.length > 1 ? this.viewPeriod[1] : this.viewPeriod[0],
      );
      this.handleResponse(response, 'currencyData');
    },
    async fetchExchangeRatesTopCount(topCount = 10) {
      const nbp = new NBP();
      this.loading = true;
      const response = await nbp.exchangeRatesGeneralTopCount(TABLE_TYPES.A, topCount);
      this.loading = false;
      this.handleResponse(response, 'currencyData');
    },
    handleResponse(response, target) {
      if (response.status >= 200 && response.status < 300) this[target] = response.data;
      else this.handleError(response);
    },
    handleError(response) {
      // eslint-disable-next-line no-alert
      alert(`Error code: ${response.status} || Reason: ${response.data}`);
    },
  },
};
</script>
<style scoped>
  @media all and (max-width: 800px) {
    .main-grid {
      grid-template-columns: auto !important;
    }
  }
  .main-grid {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
  }
  .span-item {
    grid-row: 1 / span 2;
  }
  .buttons-on-chart {
    position: absolute;
    top: 20px;
    left: 20px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-gap: 10px;
    z-index: 10;
  }
</style>
