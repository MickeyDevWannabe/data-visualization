<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          NBP data visualization
        </h1>

        <v-row>
          <v-col class="ma-1">
            <v-card
              class="d-flex flex-column"
              style="height: 100%;"
            >
              <v-card-title>Data period</v-card-title>
              <v-card-text>
                <multiline-text-card :items="getViewPeriod" />
              </v-card-text>
              <div>
                <v-col>
                  <v-text-field
                    v-model="topCount"
                    label="Last X data sets"
                  />
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    @click="fetchExchangeRates"
                  >
                    Get exchange rates for selected period
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    @click="fetchExchangeRatesTopCount"
                  >
                    Get last {{ topCount }} data sets
                  </v-btn>
                </v-col>
              </div>
              <div class="align-end d-flex flex-grow-1 justify-center mb-3">
                <datepicker-dialog
                  :max="dayjs().format('YYYY-MM-DD')"
                  :min="dayjs().subtract(93, 'day').format('YYYY-MM-DD')"
                  range
                  text="Change range"
                  :value="viewPeriod"
                  @change="viewPeriod = $event"
                />
              </div>
            </v-card>
          </v-col>
          <v-col>
            <Chart
              :categories="['Currency']"
              :series="prepareChartData(mappedData)"
              title="Currency value"
              y-axis-title="Avg. exchange rate"
            />
          </v-col>
          <v-col cols="4">
            <Chart
              :categories="['Currency']"
              :series="prepareChartData(topThreeCurrencies)"
              title="Top 3 currencies"
              y-axis-title="Avg. exchange rate"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <text-card
              :text="publicationDate"
              title="Publication date"
            />
          </v-col>
          <v-col cols="4">
            <text-card
              :label="highestValue ? highestValue.code : ''"
              :loading="loading"
              :text="highestValue ? highestValue.value : ''"
              title="Highest value"
            />
          </v-col>
          <v-col cols="4">
            <multiline-text-card
              avatar
              :items="topThreeCurrencies"
              :loading="loading"
              title="Top 3 currencies"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <text-card
              :text="datasetSize"
              title="Dataset size"
            />
          </v-col>
          <v-col cols="4">
            <text-card
              :label="lowestValue ? lowestValue.code : ''"
              :loading="loading"
              :text="lowestValue ? lowestValue.value : ''"
              title="Lowest value"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs';
import { NBP, TABLE_TYPES } from '../plugins/nbp';
import Chart from './core/charts/Chart.vue';
import TextCard from './core/cards/TextCard.vue';
import MultilineTextCard from './core/cards/MultilineTextCard.vue';
import DatepickerDialog from './layout/DatepickerDialog.vue';

export default {
  name: 'index',
  components: {
    Chart, DatepickerDialog, MultilineTextCard, TextCard,
  },
  data: () => ({
    currencyData: null,
    goldData: null,
    loading: false,
    tableType: null,
    topCount: 1,
    viewPeriod: dayjs().format('YYYY-MM-DD'),
  }),

  created() {
    this.tableType = TABLE_TYPES.A;
  },

  watch: {
    viewPeriod(value) {
      if (value.length > 1 && value[0] > value[1]) {
        this.viewPeriod = value.reverse();
      }
    },
  },

  computed: {
    getViewPeriod() {
      let period = this.viewPeriod;
      if (!Array.isArray(period)) period = [period];
      const periodLabels = ['From', 'To'];
      return period.map((item, index) => ({ code: periodLabels[index], value: item }));
    },
    dayjs() {
      return dayjs;
    },
    mappedData() {
      if (!this.currencyData) return [];
      // if (Array.isArray(this.currencyData)) {
      //   console.log('Currency data: ', this.currencyData);
      //   this.currencyData.reduce((acc, curr) => {
      //     console.log('Acc: ', acc);
      //     console.log('Curr: ', curr);
      //     console.log('Curr.rates: ', curr.rates);
      //     const prep = this.prepareRatesOptions(curr.rates);
      //     console.log('Prepd opts: ', prep);
      //     return acc.push(this.prepareRatesOptions(curr.rates));
      //   }, []);
      // }
      const newestData = this.currencyData[this.currencyData.length - 1];
      const sorted = newestData.rates.sort((a, b) => a.code.localeCompare(b.code));
      return this.prepareRatesOptions(sorted);
    },
    publicationDate() {
      if (!this.currencyData) return null;
      return this.currencyData[this.currencyData.length - 1].effectiveDate;
    },
    highestValue() {
      if (!this.mappedData.length) return null;
      return this.mappedData
        .reduce((acc, curr) => (acc.value < curr.value ? curr : acc), this.mappedData[0]);
    },
    lowestValue() {
      if (!this.mappedData.length) return null;
      return this.mappedData
        .reduce((acc, curr) => (acc.value > curr.value ? curr : acc), this.mappedData[0]);
    },
    datasetSize() {
      return this.mappedData.length;
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
    prepareChartData(options) {
      return options.map((obj) => ({
        name: obj.code,
        data: [obj.value],
      }));
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
    async fetchExchangeRatesTopCount() {
      const nbp = new NBP();
      this.loading = true;
      const response = await nbp.exchangeRatesGeneralTopCount(TABLE_TYPES.A, 10);
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
