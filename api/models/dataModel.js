/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const dataModel = new Schema({
  region: {
    name: {
      type: String
    },
    avgAge: {
      type: Number
    },
    avgDailyIncomeInUSD: {
      type: Number
    },
    avgDailyIncomePopulation: {
      type: Number
    }
  },
  periodType: {
    type: String
  },
  timeToElapse: {
    type: Number
  },
  reportedCases: {
    type: Number
  },
  population: {
    type: Number
  },
  totalHospitalBeds: {
    type: Number
  }
});

module.exports = mongoose.model('Data', dataModel);
