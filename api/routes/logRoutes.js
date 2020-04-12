const express = require('express');

function logRoutes(Logs) {
  const logRouter = express.Router();

  logRouter.route('/')
    .get((req, res) => {
      Logs.find((err, logs) => {
        if (err) {
          res.send(err);
        }
        const returnLogs = logs.map((log) => {
          // eslint-disable-next-line prefer-template
          const newLog = log.requestType + '\t\t' + log.endpoint + '\t\t' + log.responseStatus + '\t\t' + log.duration + '\n';
          return newLog;
        });

        return res.contentType('text').send((returnLogs).toString());
      });
    });

  return logRouter;
}

module.exports = logRoutes;
