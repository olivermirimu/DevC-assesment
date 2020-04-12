/* jslint es6 */
/* jslint white:true */
const express = require('express');
const debug = require('debug');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Data = require('./models/dataModel');
const Logs = require('./models/logModel');
const logRouter = require('./routes/logRoutes')(Logs);
const dataRouter = require('./routes/dataRoutes')(Data, Logs);


const app = express();
const port = 3500;
const mongoUri = 'mongodb://heroku_5jsl48cn:ch64p332mgcqhl9hjo3krtk47p@ds015942.mlab.com:15942/heroku_5jsl48cn';
// eslint-disable-next-line no-unused-vars
const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  }
});
// eslint-disable-next-line no-unused-expressions
mongoose.connection;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use('/api/v1/on-covid-19', dataRouter);
app.use('/api/v1/on-covid-19/logs', logRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my Covid-19 Estimator API');
});

app.listen(port, () => {
  debug('listening on port: ', port);
});
