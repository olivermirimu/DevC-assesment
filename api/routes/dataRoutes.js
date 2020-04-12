const express = require('express');
const xmlparser = require('xml2js');
const covidEstimator = require('../../src/estimator');

function dataRoutes(Data, Logs) {
  const dataRouter = express.Router();

  function logRequest(request, response, duration) {
    const log = new Logs({
      requestType: request.method,
      endpoint: request.originalUrl,
      responseStatus: response.statusCode,
      duration: `${duration} ms`
    });

    log.save().catch((err) => {
      console.log(err);
    });
  }

  dataRouter.use((req, res, next) => {
    const start = new Date();
    // TODO: reesponse time is inacurate
    res.on('finish', () => {
      const duration = new Date() - start;

      logRequest(req, res, duration);
    });
    next();
  });

  dataRouter.route('/')
    .get((req, res) => {
      const data = new Data(req.body);

      return res.status(201).json(covidEstimator(data));
    });

  dataRouter.route('/json')
    .get((req, res) => {
      const data = new Data(req.body);

      return res.status(201).json(covidEstimator(data));
    });

  dataRouter.route('/xml')
    .get((req, res) => {
      // const data = new Data(req.body);
      // const requestBody = req.body;
      // const result = covidEstimator(data._doc);

      // Object.entries(result.data).forEach(([key, value]) => {
      //   if (typeof (value) === "string") {
      //     value = (value);
      //     console.log(typeof value);
      //   }
      // });
      // Object.entries(result.data.region).forEach(([key, value]) => {
      //   if (typeof (value) === "string") {
      //     console.log(value);
      //   }
      // });
      // console.log(result.data);
      // console.log(new xmlparser.Builder().buildObject(result));
      res.send();
    });

  return dataRouter;
}

module.exports = dataRoutes;
