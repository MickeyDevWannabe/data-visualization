import axios from 'axios';

const TABLE_TYPES = Object.freeze({
  A: 'A',
});

const NBP = class NBP {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.nbp.pl/api/',
      timeout: 5000,
    });
  }

  exchangeRatesGeneralPeriod(
    table,
    startDate = new Date().toISOString().split('T')[0],
    endDate = new Date().toISOString().split('T')[0],
  ) {
    if (!Object.keys(TABLE_TYPES).includes(table)) {
      // eslint-disable-next-line no-alert
      alert('Invalid table type');
      throw new Error('Invalid table type');
    }
    return this.axios
      .get(`exchangerates/tables/${table}/${startDate}/${endDate}/`)
      .then((res) => ({ status: res.status, data: res.data }))
      .catch((err) => ({ status: err.response.status, data: err.response.statusText }));
  }

  exchangeRatesGeneralTopCount(table, topCount) {
    if (!Object.keys(TABLE_TYPES).includes(table)) {
      // eslint-disable-next-line no-alert
      alert('Invalid table type');
      throw new Error('Invalid table type');
    }
    return this.axios
      .get(`exchangerates/tables/${table}/last/${topCount}/`)
      .then((res) => ({ status: res.status, data: res.data }))
      .catch((err) => ({ status: err.response.status, data: err.response.statusText }));
  }
};

export {
  NBP,
  TABLE_TYPES,
};
