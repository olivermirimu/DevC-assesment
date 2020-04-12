// Helper functions
/* jslint es6 */

const impact = {};
let period;
const severeImpact = {};
const {
  trunc
} = Math;

function calculateCurrentlyInfected(input) {
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
}

function calculateinfectionsByRequestedTime(input) {
  if (input.periodType.toLocaleLowerCase() === 'days') {
    period = input.timeToElapse;
  } else if (input.periodType.toLocaleLowerCase() === 'weeks') {
    period = input.timeToElapse * 7;
  } else if (input.periodType.toLocaleLowerCase() === 'months') {
    period = input.timeToElapse * 30;
  }

  const mulFactor = (2 ** Math.trunc(period / 3));
  impact.infectionsByRequestedTime = trunc(impact.currentlyInfected * mulFactor);
  severeImpact.infectionsByRequestedTime = trunc(severeImpact.currentlyInfected * mulFactor);
}

function calulateSevereCasesByRequestedTime() {
  impact.severeCasesByRequestedTime = trunc((15 / 100) * impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = trunc((0.15) * severeImpact.infectionsByRequestedTime);
}

function calculateHospitalBedsByRequestedTime(input) {
  const cBeds = input.totalHospitalBeds * (35 / 100);

  impact.hospitalBedsByRequestedTime = trunc(cBeds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = trunc(cBeds - severeImpact.severeCasesByRequestedTime);
}

function calculateCasesForICUByRequestedTime() {
  impact.casesForICUByRequestedTime = trunc((5 / 100) * impact.infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  severeImpact.casesForICUByRequestedTime = trunc((5 / 100) * severeImpact.infectionsByRequestedTime);
}

function calculateCasesForVentilatorsByRequestedTime() {
  impact.casesForVentilatorsByRequestedTime = trunc((2 / 100) * impact.infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  severeImpact.casesForVentilatorsByRequestedTime = trunc((2 / 100) * severeImpact.infectionsByRequestedTime);
}

function calculateDollarsInFlight(input) {
  // eslint-disable-next-line max-len
  impact.dollarsInFlight = trunc((input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * impact.infectionsByRequestedTime) / period);
  // eslint-disable-next-line max-len
  severeImpact.dollarsInFlight = trunc((input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * severeImpact.infectionsByRequestedTime) / period);
}

const covid19ImpactEstimator = (data) => {
  calculateCurrentlyInfected(data);
  calculateinfectionsByRequestedTime(data);
  calulateSevereCasesByRequestedTime();
  calculateHospitalBedsByRequestedTime(data);
  calculateCasesForICUByRequestedTime();
  calculateCasesForVentilatorsByRequestedTime();
  calculateDollarsInFlight(data);
  return ({
    data,
    impact,
    severeImpact
  });
};

module.exports = covid19ImpactEstimator;
